/**
 * Hauptspielszene für Energy Rush: Solar Sprint
 */
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        // Spielmodus aus Registry abrufen
        this.gameMode = this.registry.get('gameMode') || 'single';
        
        // Spielvariablen initialisieren
        this.gameOver = false;
        this.gameWon = false;
        this.energyCollected = 0;
        this.energyTarget = 0;
        this.timeRemaining = 0;
        this.activeObstacle = null;
        
        // Spielobjekte
        this.energySources = [];
        this.energyTokens = [];
        this.grid = null;
    }

    create() {
        // Spielkonfiguration abrufen
        this.gameConfig = this.game.config.gameSettings;
        this.energyTarget = this.gameConfig.objectives.energyTarget;
        this.timeRemaining = this.gameConfig.objectives.timeLimit;
        
        // Hintergrund erstellen
        this.createBackground();
        
        // Energiequellen erstellen
        this.createEnergySources();
        
        // Grid erstellen
        this.grid = new Grid(this, this.gameConfig.grid);
        
        // UI-Szene starten
        this.scene.launch('UIScene');
        this.scene.get('UIScene').events.on('timeUp', this.onTimeUp, this);
        
        // Ereignis-Timer für zufällige Hindernisse
        this.obstacleTimer = this.time.addEvent({
            delay: 20000, // Alle 20 Sekunden
            callback: this.spawnRandomObstacle,
            callbackScope: this,
            loop: true
        });
        
        // Ereignis-Timer für zufällige Energietokens
        this.tokenTimer = this.time.addEvent({
            delay: 5000, // Alle 5 Sekunden
            callback: this.spawnEnergyToken,
            callbackScope: this,
            loop: true
        });
        
        // Tutorial starten, falls im Tutorial-Modus
        if (this.gameMode === 'tutorial') {
            this.startTutorial();
        }
        
        // Hintergrundmusik starten
        this.sound.play('background-music', {
            volume: 0.3,
            loop: true
        });
    }

    update(time, delta) {
        if (this.gameOver) return;
        
        // Zeit aktualisieren
        this.timeRemaining -= delta;
        if (this.timeRemaining <= 0) {
            this.onTimeUp();
            return;
        }
        
        // UI aktualisieren
        this.updateUI();
        
        // Prüfen, ob Ziel erreicht wurde
        if (this.energyCollected >= this.energyTarget && !this.gameWon) {
            this.winGame();
        }
    }
    
    // Hintergrund erstellen
    createBackground() {
        // Einfacher Hintergrund
        this.add.rectangle(0, 0, 800, 600, 0x87CEEB).setOrigin(0, 0);
        
        // Landschaft hinzufügen
        this.add.rectangle(0, 500, 800, 100, 0x228B22).setOrigin(0, 0);
        
        // Sonne
        this.add.circle(700, 100, 50, 0xFFFF00);
    }
    
    // Energiequellen erstellen
    createEnergySources() {
        // Solar-Panels
        const solarPanel1 = new EnergySource(this, 200, 200, 'solar', this.gameConfig.energySources.solar);
        const solarPanel2 = new EnergySource(this, 300, 200, 'solar', this.gameConfig.energySources.solar);
        
        // Windturbinen
        const windTurbine1 = new EnergySource(this, 500, 250, 'wind', this.gameConfig.energySources.wind);
        const windTurbine2 = new EnergySource(this, 600, 250, 'wind', this.gameConfig.energySources.wind);
        
        // Wasserkraftwerke
        const hydroDam1 = new EnergySource(this, 350, 400, 'hydro', this.gameConfig.energySources.hydro);
        const hydroDam2 = new EnergySource(this, 450, 400, 'hydro', this.gameConfig.energySources.hydro);
        
        // Alle Energiequellen speichern
        this.energySources = [
            solarPanel1, solarPanel2,
            windTurbine1, windTurbine2,
            hydroDam1, hydroDam2
        ];
    }
    
    // UI aktualisieren
    updateUI() {
        // UI-Szene aktualisieren
        this.events.emit('updateUI', {
            energy: this.energyCollected,
            target: this.energyTarget,
            timeRemaining: this.timeRemaining
        });
    }
    
    // Energie sammeln (von EnergySource aufgerufen)
    energyCollected(amount) {
        // Energie zum Grid hinzufügen
        if (this.grid.addEnergy(amount)) {
            this.energyCollected += amount;
            this.updateUI();
        }
    }
    
    // Energie von Token sammeln
    collectEnergyToken(amount) {
        // Energie direkt zum Spieler hinzufügen (nicht zum Grid)
        this.energyCollected += amount;
        this.updateUI();
    }
    
    // Zufälliges Energietoken erzeugen
    spawnEnergyToken() {
        // Wenn das Spiel vorbei ist, keine Tokens mehr erzeugen
        if (this.gameOver) return;
        
        // Zufällige Position im Spielbereich
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        
        // Energietoken erstellen
        const token = new EnergyToken(this, x, y);
        this.energyTokens.push(token);
        
        // Token nach einiger Zeit verschwinden lassen, wenn es nicht gesammelt wurde
        this.time.delayedCall(10000, () => {
            if (token && !token.collected) {
                const index = this.energyTokens.indexOf(token);
                if (index > -1) {
                    this.energyTokens.splice(index, 1);
                }
                token.destroy();
            }
        });
    }
    
    // Zufälliges Hindernis erzeugen
    spawnRandomObstacle() {
        // Wenn bereits ein Hindernis aktiv ist, nichts tun
        if (this.activeObstacle && this.activeObstacle.active) return;
        
        // Zufälligen Hindernistyp auswählen
        const obstacleTypes = ['storm', 'calm', 'drought', 'flood'];
        const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        
        // Hindernis erstellen und aktivieren
        this.activeObstacle = new Obstacle(this, randomType);
        
        // Vorwarnung anzeigen
        this.showWarning(`${this.activeObstacle.getTypeName()} im Anmarsch!`);
        
        // Verzögerung vor Aktivierung
        this.time.delayedCall(this.gameConfig.obstacles.stormWarningTime, () => {
            if (this.activeObstacle) this.activeObstacle.activate();
        });
    }
    
    // Warnmeldung anzeigen
    showWarning(message) {
        // Nachricht an UI-Szene senden
        this.events.emit('showWarning', message);
    }
    
    // Spielende bei Zeitablauf
    onTimeUp() {
        if (!this.gameOver) {
            this.endGame('Zeit abgelaufen! Die Stadt benötigt mehr Energie.');
        }
    }
    
    // Spiel gewinnen
    winGame() {
        this.gameWon = true;
        this.endGame('Gewonnen! Die Stadt ist mit erneuerbarer Energie versorgt.', true);
    }
    
    // Spiel beenden
    endGame(message, success = false) {
        this.gameOver = true;
        
        // Timer stoppen
        if (this.obstacleTimer) this.obstacleTimer.remove();
        if (this.tokenTimer) this.tokenTimer.remove();
        
        // Nachricht an UI-Szene senden
        this.events.emit('gameOver', { message, success });
        
        // Sound abspielen
        if (success) {
            this.sound.play('collect', { volume: 1.0 });
        } else {
            this.sound.play('warning', { volume: 1.0 });
        }
    }
    
    // Tutorial starten
    startTutorial() {
        const steps = [
            {
                message: 'Willkommen bei Energy Rush: Solar Sprint!',
                delay: 2000
            },
            {
                message: 'Klicke auf die Energiequellen, um Energie zu sammeln.',
                delay: 5000
            },
            {
                message: 'Solaranlagen erzeugen Energie bei Sonnenschein, Windturbinen bei Wind und Wasserkraftwerke durch Wasserfluss.',
                delay: 8000
            },
            {
                message: 'Achte auf Umweltereignisse wie Stürme, die die Energieproduktion beeinträchtigen können.',
                delay: 8000
            },
            {
                message: 'Wenn eine Anlage defekt ist, klicke darauf, um sie zu reparieren.',
                delay: 5000
            },
            {
                message: 'Vermeide Netzüberlastungen und Blackouts, indem du die Energie regelmäßig sammelst.',
                delay: 8000
            },
            {
                message: 'Erreiche das Energieziel, bevor die Zeit abläuft!',
                delay: 5000
            },
            {
                message: 'Viel Erfolg!',
                delay: 3000
            }
        ];
        
        // Tutorial-Schritte nacheinander anzeigen
        let totalDelay = 0;
        steps.forEach(step => {
            this.time.delayedCall(totalDelay, () => {
                this.showWarning(step.message);
            });
            totalDelay += step.delay;
        });
    }
}