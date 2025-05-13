/**
 * UI-Szene für die Spieloberfläche
 */
class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        // UI-Elemente erstellen
        this.createUI();
        
        // Events von der GameScene abonnieren
        const gameScene = this.scene.get('GameScene');
        gameScene.events.on('updateUI', this.updateUI, this);
        gameScene.events.on('showWarning', this.showWarning, this);
        gameScene.events.on('gameOver', this.showGameOver, this);
        
        // Timer starten
        this.startTimer();
    }
    
    // UI-Elemente erstellen
    createUI() {
        // Energie-Anzeige
        this.energyText = this.add.text(20, 20, 'Energie: 0/100', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });
        
        // Zeit-Anzeige
        this.timeText = this.add.text(20, 50, 'Zeit: 5:00', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });
        
        // Warnungstext
        this.warningText = this.add.text(400, 550, '', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5, 0.5);
        
        // Game Over Container (unsichtbar zu Beginn)
        this.gameOverContainer = this.add.container(400, 300);
        this.gameOverContainer.setAlpha(0);
        
        // Game Over Hintergrund
        const gameOverBg = this.add.rectangle(0, 0, 500, 300, 0x000000, 0.8);
        
        // Game Over Text
        this.gameOverText = this.add.text(0, -50, '', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Game Over Nachricht
        this.gameOverMessage = this.add.text(0, 20, '', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Neustart-Button
        const restartButton = this.add.rectangle(0, 100, 200, 50, 0x0284c7)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.restartGame())
            .on('pointerover', () => restartButton.setFillStyle(0x0ea5e9))
            .on('pointerout', () => restartButton.setFillStyle(0x0284c7));
        
        const restartText = this.add.text(0, 100, 'Neustart', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Elemente zum Container hinzufügen
        this.gameOverContainer.add([
            gameOverBg,
            this.gameOverText,
            this.gameOverMessage,
            restartButton,
            restartText
        ]);
    }
    
    // UI aktualisieren
    updateUI(data) {
        // Energie-Anzeige aktualisieren
        this.energyText.setText(`Energie: ${Math.round(data.energy)}/${data.target}`);
        
        // Zeit-Anzeige aktualisieren
        const minutes = Math.floor(data.timeRemaining / 60000);
        const seconds = Math.floor((data.timeRemaining % 60000) / 1000);
        this.timeText.setText(`Zeit: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
    
    // Timer starten
    startTimer() {
        // Timer-Event für Countdown
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }
    
    // Timer aktualisieren
    updateTimer() {
        // Wird durch updateUI() von der GameScene aktualisiert
    }
    
    // Warnung anzeigen
    showWarning(message) {
        // Warnungstext setzen
        this.warningText.setText(message);
        
        // Warnungstext einblenden
        this.tweens.killTweensOf(this.warningText);
        this.warningText.setAlpha(1);
        
        // Nach 3 Sekunden ausblenden
        this.tweens.add({
            targets: this.warningText,
            alpha: 0,
            duration: 500,
            delay: 3000
        });
    }
    
    // Game Over anzeigen
    showGameOver(data) {
        // Timer stoppen
        if (this.timerEvent) this.timerEvent.remove();
        
        // Game Over Text setzen
        if (data.success) {
            this.gameOverText.setText('MISSION ERFÜLLT!');
            this.gameOverText.setColor('#00ff00');
        } else {
            this.gameOverText.setText('MISSION FEHLGESCHLAGEN');
            this.gameOverText.setColor('#ff0000');
        }
        
        // Game Over Nachricht setzen
        this.gameOverMessage.setText(data.message);
        
        // Game Over Container einblenden
        this.tweens.add({
            targets: this.gameOverContainer,
            alpha: 1,
            duration: 500
        });
    }
    
    // Spiel neustarten
    restartGame() {
        // Alle Szenen stoppen und neu starten
        this.scene.stop('UIScene');
        this.scene.stop('GameScene');
        this.scene.start('MenuScene');
    }
}