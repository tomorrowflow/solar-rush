/**
 * Energiequelle-Klasse für Solar-, Wind- und Wasserkraftwerke
 */
class EnergySource {
    constructor(scene, x, y, type, config) {
        this.scene = scene;
        this.type = type; // 'solar', 'wind', oder 'hydro'
        this.config = config;
        
        // Sprite basierend auf Typ erstellen
        let spriteKey;
        switch (type) {
            case 'solar':
                spriteKey = 'solar-panel';
                break;
            case 'wind':
                spriteKey = 'wind-turbine';
                break;
            case 'hydro':
                spriteKey = 'hydro-dam';
                break;
            default:
                spriteKey = 'energy-token';
        }
        
        // Sprite erstellen
        this.sprite = scene.physics.add.sprite(x, y, spriteKey);
        this.sprite.setInteractive({ useHandCursor: true });
        
        // Eigenschaften
        this.currentOutput = config.baseOutput;
        this.efficiency = 1.0; // 100% Effizienz zu Beginn
        this.broken = false;
        this.repairing = false;
        this.currentStorage = 0;
        
        // Event-Handler für Klicks
        this.sprite.on('pointerdown', this.onClick, this);
        
        // Statustext
        this.statusText = scene.add.text(x, y + 40, '', {
            fontFamily: 'Arial',
            fontSize: 12,
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#000000'
        }).setOrigin(0.5);
        
        // Timer für Energieerzeugung
        this.productionTimer = scene.time.addEvent({
            delay: 1000,
            callback: this.produceEnergy,
            callbackScope: this,
            loop: true
        });
        
        // Zufällige Ausfälle
        this.failureTimer = scene.time.addEvent({
            delay: 5000,
            callback: this.checkFailure,
            callbackScope: this,
            loop: true
        });
        
        this.updateStatusText();
    }
    
    // Energieerzeugung pro Tick
    produceEnergy() {
        if (this.broken) return;
        
        // Energie basierend auf Effizienz erzeugen
        const energyProduced = this.currentOutput * this.efficiency;
        
        // Speicher aktualisieren
        this.currentStorage = Math.min(
            this.currentStorage + energyProduced,
            this.config.maxCapacity
        );
        
        this.updateStatusText();
    }
    
    // Energie sammeln (vom Spieler aufgerufen)
    collectEnergy() {
        if (this.broken || this.currentStorage <= 0) return 0;
        
        const collected = this.currentStorage;
        this.currentStorage = 0;
        this.updateStatusText();
        
        // Sammel-Sound abspielen
        this.scene.sound.play('collect', { volume: 0.5 });
        
        // Visuellen Effekt für das Sammeln anzeigen
        this.showCollectEffect();
        
        return collected;
    }
    
    // Auf Klick reagieren
    onClick() {
        if (this.broken && !this.repairing) {
            this.startRepair();
        } else {
            const collected = this.collectEnergy();
            if (collected > 0) {
                this.scene.energyCollected(collected);
            }
        }
    }
    
    // Reparatur starten
    startRepair() {
        if (!this.broken || this.repairing) return;
        
        this.repairing = true;
        this.statusText.setText('Reparatur...');
        
        // Reparatur-Timer
        this.scene.time.delayedCall(this.config.repairTime, () => {
            this.broken = false;
            this.repairing = false;
            this.efficiency = 1.0;
            this.scene.sound.play('repair', { volume: 0.7 });
            this.updateStatusText();
            
            // Visuellen Effekt für die Reparatur anzeigen
            this.showRepairEffect();
        });
    }
    
    // Prüfen auf zufälligen Ausfall
    checkFailure() {
        if (this.broken || this.repairing) return;
        
        // Zufällige Ausfallwahrscheinlichkeit
        if (Math.random() < this.scene.gameConfig.obstacles.failureProbability) {
            this.broken = true;
            this.efficiency = 0;
            this.updateStatusText();
            
            // Warnsound abspielen
            this.scene.sound.play('warning', { volume: 0.7 });
        }
    }
    
    // Auf Umweltereignisse reagieren
    applyEnvironmentalEffect(effect) {
        if (this.broken) return;
        
        switch (effect) {
            case 'storm':
                if (this.type === 'solar') {
                    this.efficiency = this.config.stormEffect;
                } else if (this.type === 'wind') {
                    this.efficiency = this.config.stormEffect;
                }
                break;
            case 'calm':
                if (this.type === 'wind') {
                    this.efficiency = this.config.calmEffect;
                }
                break;
            case 'drought':
                if (this.type === 'hydro') {
                    this.efficiency = this.config.droughtEffect;
                }
                break;
            case 'flood':
                if (this.type === 'hydro') {
                    this.efficiency = this.config.floodEffect;
                }
                break;
            case 'normal':
                this.efficiency = 1.0;
                break;
        }
        
        this.updateStatusText();
    }
    
    // Statustext aktualisieren
    updateStatusText() {
        if (this.broken) {
            this.statusText.setText('DEFEKT - Klicken zum Reparieren');
            this.statusText.setBackgroundColor('#ff0000');
        } else {
            const efficiencyPercent = Math.round(this.efficiency * 100);
            this.statusText.setText(`${this.type.toUpperCase()}: ${Math.round(this.currentStorage)}/${this.config.maxCapacity}\nEffizienz: ${efficiencyPercent}%`);
            
            if (efficiencyPercent < 50) {
                this.statusText.setBackgroundColor('#ff6600');
            } else {
                this.statusText.setBackgroundColor('#000000');
            }
        }
    }
    
    // Visueller Effekt beim Sammeln
    showCollectEffect() {
        const x = this.sprite.x;
        const y = this.sprite.y;
        
        // Energietoken-Animation
        const token = this.scene.add.sprite(x, y, 'energy-token').setScale(0.5);
        
        this.scene.tweens.add({
            targets: token,
            y: y - 50,
            alpha: 0,
            scale: 1,
            duration: 800,
            onComplete: () => token.destroy()
        });
    }
    
    // Visueller Effekt bei Reparatur
    showRepairEffect() {
        const x = this.sprite.x;
        const y = this.sprite.y;
        
        // Reparatur-Blitz-Animation
        const flash = this.scene.add.rectangle(x, y, 
            this.sprite.width + 20, 
            this.sprite.height + 20, 
            0xffff00, 0.8);
        
        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            scale: 1.5,
            duration: 500,
            onComplete: () => flash.destroy()
        });
    }
    
    // Aufräumen beim Zerstören
    destroy() {
        if (this.productionTimer) this.productionTimer.remove();
        if (this.failureTimer) this.failureTimer.remove();
        if (this.sprite) this.sprite.destroy();
        if (this.statusText) this.statusText.destroy();
    }
}