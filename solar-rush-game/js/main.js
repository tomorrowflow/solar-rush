/**
 * Hauptdatei für Energy Rush: Solar Sprint
 * Initialisiert das Phaser-Spiel und startet die erste Szene
 */

// Warten, bis das DOM geladen ist
window.onload = function() {
    // Prüfen, ob die Szenen definiert sind
    if (typeof BootScene === 'undefined' || 
        typeof MenuScene === 'undefined' || 
        typeof GameScene === 'undefined' || 
        typeof UIScene === 'undefined') {
        
        console.error('Fehler: Eine oder mehrere Szenen sind nicht definiert!');
        
        // Fehlermeldung anzeigen
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.style.padding = '20px';
        errorDiv.style.textAlign = 'center';
        errorDiv.innerHTML = '<h2>Fehler beim Laden des Spiels</h2>' +
                            '<p>Eine oder mehrere Spielkomponenten konnten nicht geladen werden.</p>' +
                            '<p>Bitte aktualisieren Sie die Seite oder prüfen Sie die Konsole für weitere Details.</p>';
        
        document.getElementById('game-container').appendChild(errorDiv);
        return;
    }
    
    // Szenen zur Konfiguration hinzufügen
    try {
        // Prüfen, ob alle Szenen verfügbar sind
        if (typeof BootScene !== 'undefined') config.scene.push(BootScene);
        if (typeof MenuScene !== 'undefined') config.scene.push(MenuScene);
        if (typeof GameScene !== 'undefined') config.scene.push(GameScene);
        if (typeof UIScene !== 'undefined') config.scene.push(UIScene);
        
        // Phaser-Spiel erstellen
        const game = new Phaser.Game(config);
        console.log('Energy Rush: Solar Sprint wurde erfolgreich gestartet!');
    } catch (error) {
        console.error('Fehler beim Starten des Spiels:', error);
    }
};

// Platzhalter-Assets erstellen
function createPlaceholderAssets() {
    // Diese Funktion erstellt einfache Platzhalter-Assets für die Entwicklung
    // In einer echten Produktionsumgebung würden hier echte Assets verwendet werden
    
    console.log('Erstelle Platzhalter-Assets für die Entwicklung...');
    
    // Platzhalter für Bilder
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Funktion zum Erstellen eines einfachen Platzhalterbildes
    function createPlaceholder(name, width, height, color) {
        canvas.width = width;
        canvas.height = height;
        
        // Hintergrund
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        
        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, width / 2, height / 2);
        
        // Als Daten-URL speichern
        return canvas.toDataURL();
    }
    
    // Platzhalter für Audio
    function createAudioPlaceholder() {
        // Leere Audio-Datei (1 Sekunde Stille)
        return 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    }
    
    // Platzhalter-Assets erstellen und im localStorage speichern
    const assets = [
        { name: 'background', type: 'image', width: 800, height: 600, color: '#87CEEB' },
        { name: 'solar-panel', type: 'image', width: 64, height: 64, color: '#0000FF' },
        { name: 'wind-turbine', type: 'image', width: 64, height: 96, color: '#00FF00' },
        { name: 'hydro-dam', type: 'image', width: 96, height: 64, color: '#00FFFF' },
        { name: 'energy-token', type: 'image', width: 32, height: 32, color: '#FFFF00' },
        { name: 'storm-cloud', type: 'image', width: 128, height: 64, color: '#666666' },
        { name: 'button', type: 'image', width: 200, height: 50, color: '#AAAAAA' },
        { name: 'collect', type: 'audio' },
        { name: 'warning', type: 'audio' },
        { name: 'repair', type: 'audio' },
        { name: 'background-music', type: 'audio' }
    ];
    
    // Assets im localStorage speichern
    assets.forEach(asset => {
        const key = `placeholder_${asset.name}`;
        let data;
        
        if (asset.type === 'image') {
            data = createPlaceholder(asset.name, asset.width, asset.height, asset.color);
        } else if (asset.type === 'audio') {
            data = createAudioPlaceholder();
        }
        
        if (data) {
            try {
                localStorage.setItem(key, data);
            } catch (e) {
                console.warn(`Konnte Platzhalter für ${asset.name} nicht im localStorage speichern:`, e);
            }
        }
    });
    
    console.log('Platzhalter-Assets wurden erstellt!');
}

// Platzhalter-Assets erstellen, wenn keine echten Assets vorhanden sind
createPlaceholderAssets();