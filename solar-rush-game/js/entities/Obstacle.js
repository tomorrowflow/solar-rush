/**
 * Obstacle-Klasse für Umweltereignisse wie Stürme, Windstille, etc.
 */
class Obstacle {
    constructor(scene, type) {
        this.scene = scene;
        this.type = type; // 'storm', 'calm', 'drought', 'flood'
        this.active = false;
        this.sprite = null;
        this.warningText = null;
        this.gameConfig = scene.gameConfig;
    }
    
    // Hindernis aktivieren
    activate() {
        if (this.active) return;
        
        this.active = true;
        
        // Visuelles Element basierend auf Typ erstellen
        switch (this.type) {
            case 'storm':
                this.createStorm();
                break;
            case 'calm':
                this.createCalm();
                break;
            case 'drought':
                this.createDrought();
                break;
            case 'flood':
                this.createFlood();
                break;
        }
        
        // Auswirkungen auf Energiequellen anwenden
        this.applyEffects();
        
        // Timer für Ende des Hindernisses
        const duration = this.getDuration();
        this.scene.time.delayedCall(duration, () => {
            this.deactivate();
        });
    }
    
    // Hindernis deaktivieren
    deactivate() {
        if (!this.active) return;
        
        this.active = false;
        
        // Visuelles Element entfernen
        if (this.sprite) {
            this.sprite.destroy();
            this.sprite = null;
        }
        
        if (this.warningText) {
            this.warningText.destroy();
            this.warningText = null;
        }
        
        // Normale Bedingungen wiederherstellen
        this.removeEffects();
    }
    
    // Sturm erstellen
    createStorm() {
        // Wolke über dem Spielfeld
        this.sprite = this.scene.add.sprite(400, 100, 'storm-cloud');
        
        // Animation für die Wolke
        this.scene.tweens.add({
            targets: this.sprite,
            x: '+=100',
            yoyo: true,
            repeat: -1,
            duration: 2000,
            ease: 'Sine.easeInOut'
        });
        
        // Warntext
        this.warningText = this.scene.add.text(400, 50, 'STURM!', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        
        // Blinkeffekt für den Warntext
        this.scene.tweens.add({
            targets: this.warningText,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            duration: 500
        });
        
        // Warnsound abspielen
        this.scene.sound.play('warning', { volume: 0.7 });
    }
    
    // Windstille erstellen
    createCalm() {
        // Visueller Indikator für Windstille
        this.warningText = this.scene.add.text(400, 50, 'WINDSTILLE!', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
    }
    
    // Trockenheit erstellen
    createDrought() {
        // Visueller Indikator für Trockenheit
        this.warningText = this.scene.add.text(400, 50, 'TROCKENHEIT!', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ff8c00',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
    }
    
    // Überschwemmung erstellen
    createFlood() {
        // Visueller Indikator für Überschwemmung
        this.warningText = this.scene.add.text(400, 50, 'ÜBERSCHWEMMUNG!', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#00bfff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
    }
    
    // Auswirkungen auf Energiequellen anwenden
    applyEffects() {
        // Alle Energiequellen durchgehen und Effekt anwenden
        this.scene.energySources.forEach(source => {
            source.applyEnvironmentalEffect(this.type);
        });
        
        // Nachricht anzeigen
        let message = '';
        switch (this.type) {
            case 'storm':
                message = 'Ein Sturm beeinträchtigt Solar- und Windenergie!';
                break;
            case 'calm':
                message = 'Windstille reduziert die Effizienz der Windturbinen!';
                break;
            case 'drought':
                message = 'Trockenheit reduziert die Effizienz der Wasserkraftwerke!';
                break;
            case 'flood':
                message = 'Überschwemmung beeinträchtigt die Wasserkraftwerke!';
                break;
        }
        
        this.scene.showWarning(message);
    }
    
    // Effekte entfernen
    removeEffects() {
        // Alle Energiequellen durchgehen und normale Bedingungen wiederherstellen
        this.scene.energySources.forEach(source => {
            source.applyEnvironmentalEffect('normal');
        });
        
        // Nachricht anzeigen
        this.scene.showWarning(`Das ${this.getTypeName()} ist vorüber!`);
    }
    
    // Dauer des Hindernisses ermitteln
    getDuration() {
        switch (this.type) {
            case 'storm':
                return this.gameConfig.obstacles.stormDuration;
            case 'calm':
            case 'drought':
            case 'flood':
                return this.gameConfig.obstacles.stormDuration * 0.8; // Etwas kürzer als Stürme
            default:
                return 10000; // 10 Sekunden Standard
        }
    }
    
    // Typnamen für Nachrichten abrufen
    getTypeName() {
        switch (this.type) {
            case 'storm':
                return 'Unwetter';
            case 'calm':
                return 'Windstille';
            case 'drought':
                return 'Trockenheit';
            case 'flood':
                return 'Hochwasser';
            default:
                return 'Ereignis';
        }
    }
    
    // Aufräumen beim Zerstören
    destroy() {
        if (this.sprite) this.sprite.destroy();
        if (this.warningText) this.warningText.destroy();
    }
}