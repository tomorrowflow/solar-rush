/**
 * Boot-Szene zum Laden von Assets und Initialisierung
 */
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Lade-Anzeige
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Wird geladen...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        // Lade-Fortschritt
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
        
        // Bilder laden
        this.load.image('background', 'assets/images/background.png');
        this.load.image('solar-panel', 'assets/images/solar-panel.png');
        this.load.image('wind-turbine', 'assets/images/wind-turbine.png');
        this.load.image('hydro-dam', 'assets/images/hydro-dam.png');
        this.load.image('energy-token', 'assets/images/energy-token.png');
        this.load.image('storm-cloud', 'assets/images/storm-cloud.png');
        this.load.image('button', 'assets/images/button.png');
        this.load.image('overview', 'assets/images/overview.jpg');
        
        // Audio laden
        this.load.audio('collect', 'assets/audio/collect.mp3');
        this.load.audio('warning', 'assets/audio/warning.mp3');
        this.load.audio('repair', 'assets/audio/repair.mp3');
        this.load.audio('background-music', 'assets/audio/background-music.mp3');
        
        // Platzhalter-Assets erstellen, falls keine vorhanden sind
        this.createPlaceholderAssets();
    }

    create() {
        this.scene.start('MenuScene');
    }
    
    // Erstellt einfache Platzhalter-Assets, falls keine vorhanden sind
    createPlaceholderAssets() {
        console.log('Prüfe auf Platzhalter-Assets...');
        
        // Im Browser können wir keine Dateisystemoperationen durchführen
        // Stattdessen verwenden wir die im main.js erstellten Platzhalter
        
        // Prüfen, ob Platzhalter im localStorage vorhanden sind
        const placeholders = [
            'background', 'solar-panel', 'wind-turbine', 'hydro-dam',
            'energy-token', 'storm-cloud', 'button'
        ];
        
        placeholders.forEach(name => {
            const key = `placeholder_${name}`;
            const data = localStorage.getItem(key);
            
            if (data) {
                console.log(`Platzhalter für ${name} gefunden.`);
                // Hier könnten wir die Platzhalter verwenden, falls nötig
            }
        });
    }
}