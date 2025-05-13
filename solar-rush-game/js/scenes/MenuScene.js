/**
 * Menü-Szene für das Hauptmenü des Spiels
 */
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Hintergrund
        this.add.rectangle(0, 0, 800, 600, 0x0c4a6e).setOrigin(0, 0);
        
        // Titel
        this.add.text(400, 100, 'Energy Rush: Solar Sprint', {
            fontFamily: 'Arial',
            fontSize: 36,
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Untertitel
        this.add.text(400, 160, 'Sammle erneuerbare Energie und versorge die Stadt!', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Spielbeschreibung
        const description = [
            'Sammle Energie von Solaranlagen, Windturbinen und Wasserkraftwerken.',
            'Achte auf Umweltereignisse wie Stürme und Überschwemmungen.',
            'Repariere beschädigte Anlagen und vermeide Netzüberlastungen.',
            'Erreiche das Energieziel, bevor die Zeit abläuft!'
        ];
        
        let yPos = 220;
        description.forEach(line => {
            this.add.text(400, yPos, line, {
                fontFamily: 'Arial',
                fontSize: 16,
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
            yPos += 25;
        });
        
        // Spielmodus-Auswahl
        this.createButton(400, 380, 'Einzelspieler', () => {
            this.startGame('single');
        });
        
        this.createButton(400, 450, 'Tutorial', () => {
            this.showTutorial();
        });
        
        this.createButton(400, 520, 'Beenden', () => {
            // In einem echten Spiel würde hier das Spiel beendet werden
            // Im Browser können wir nur zur Bestätigung eine Nachricht anzeigen
            if (confirm('Möchten Sie das Spiel wirklich beenden?')) {
                window.close();
            }
        });
    }
    
    createButton(x, y, text, callback) {
        // Button-Hintergrund
        const button = this.add.rectangle(x, y, 200, 50, 0x0284c7, 1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', callback)
            .on('pointerover', () => button.setFillStyle(0x0ea5e9))
            .on('pointerout', () => button.setFillStyle(0x0284c7));
        
        // Button-Text
        this.add.text(x, y, text, {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff'
        }).setOrigin(0.5);
        
        return button;
    }
    
    startGame(mode) {
        // Spielmodus setzen und Spiel starten
        this.registry.set('gameMode', mode);
        this.scene.start('GameScene');
    }
    
    showTutorial() {
        // Tutorial-Modus starten
        this.registry.set('gameMode', 'tutorial');
        this.scene.start('GameScene');
    }
}