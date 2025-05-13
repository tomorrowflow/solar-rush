/**
 * EnergyToken-Klasse für sammelbare Energietokens
 */
class EnergyToken {
    constructor(scene, x, y, value = 10) {
        this.scene = scene;
        this.value = value; // Energiewert des Tokens
        this.collected = false;
        
        // Sprite erstellen
        this.sprite = scene.physics.add.sprite(x, y, 'energy-token');
        this.sprite.setInteractive({ useHandCursor: true });
        
        // Pulsierender Effekt für bessere Sichtbarkeit
        scene.tweens.add({
            targets: this.sprite,
            scale: { from: 0.8, to: 1.2 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        // Event-Handler für Klicks
        this.sprite.on('pointerdown', this.onClick, this);
    }
    
    // Auf Klick reagieren
    onClick() {
        if (this.collected) return;
        
        // Token als gesammelt markieren
        this.collected = true;
        
        // Sammel-Sound abspielen
        this.scene.sound.play('collect', { volume: 0.5 });
        
        // Visuellen Effekt für das Sammeln anzeigen
        this.showCollectEffect();
        
        // Energie zum Spiel hinzufügen
        this.scene.collectEnergyToken(this.value);
        
        // Token entfernen
        this.destroy();
    }
    
    // Visueller Effekt beim Sammeln
    showCollectEffect() {
        const x = this.sprite.x;
        const y = this.sprite.y;
        
        // Aufleuchten
        const flash = this.scene.add.circle(x, y, 30, 0xffff00, 0.7);
        
        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            scale: 1.5,
            duration: 300,
            onComplete: () => flash.destroy()
        });
        
        // Nach oben fliegen
        const token = this.scene.add.sprite(x, y, 'energy-token');
        
        this.scene.tweens.add({
            targets: token,
            y: y - 50,
            alpha: 0,
            scale: 0.5,
            duration: 500,
            onComplete: () => token.destroy()
        });
    }
    
    // Aufräumen beim Zerstören
    destroy() {
        if (this.sprite) this.sprite.destroy();
    }
}