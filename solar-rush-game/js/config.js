/**
 * Spielkonfiguration für Energy Rush: Solar Sprint
 */
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    // Szenen werden dynamisch hinzugefügt, wenn sie geladen sind
    scene: [],
    // Globale Spieleinstellungen
    gameSettings: {
        // Energiequellen-Einstellungen
        energySources: {
            solar: {
                baseOutput: 5,
                stormEffect: 0.2, // 20% Effizienz während eines Sturms
                repairTime: 2000, // Zeit in ms zum Reparieren
                maxCapacity: 50
            },
            wind: {
                baseOutput: 3,
                calmEffect: 0.1, // 10% Effizienz bei Windstille
                stormEffect: 0.5, // 50% Effizienz während eines Sturms
                repairTime: 3000,
                maxCapacity: 40
            },
            hydro: {
                baseOutput: 4,
                droughtEffect: 0.3, // 30% Effizienz bei Trockenheit
                floodEffect: 0.7, // 70% Effizienz bei Überschwemmung
                repairTime: 4000,
                maxCapacity: 60
            }
        },
        
        // Netzwerk-Einstellungen
        grid: {
            maxCapacity: 100,
            overloadThreshold: 90, // Warnung bei 90% Kapazität
            blackoutThreshold: 100, // Blackout bei 100% Kapazität
            baseConsumption: 1, // Grundverbrauch pro Sekunde
            demandSpikeMultiplier: 2.5 // Verbrauchsspitze Multiplikator
        },
        
        // Hindernisse und Ereignisse
        obstacles: {
            stormDuration: 10000, // Sturmdauer in ms
            stormWarningTime: 5000, // Vorwarnzeit vor Sturm
            failureProbability: 0.01, // 1% Chance auf Ausfall pro Sekunde
            demandSpikeProbability: 0.005, // 0.5% Chance auf Verbrauchsspitze pro Sekunde
            demandSpikeDuration: 8000 // Dauer einer Verbrauchsspitze in ms
        },
        
        // Spielziele
        objectives: {
            energyTarget: 100, // Benötigte Energieeinheiten zum Gewinnen
            timeLimit: 300000 // Zeitlimit in ms (5 Minuten)
        }
    }
};