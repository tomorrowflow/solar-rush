# 🎮 Energy Rush: Solar Sprint – Game Design Document (Hackathon Edition)

## 🌍 Überblick
Ein kooperatives Multiplayer-Spiel, in dem 2–4 Spieler gemeinsam eine Stadt mit nachhaltiger Energie versorgen müssen. Inspiriert von **Eco** (Nachhaltigkeit), **Factorio** (Ressourcenmanagement) und **Overcooked** (Koordination unter Zeitdruck). AI-Tools helfen bei der Umsetzung von Reparaturen, Event-Logik und Testing.

---

## 🧩 Kernmechaniken (MVP für Hackathon)

### 1. ⚡ Energiequellen & Tokens
- **Solarpanel:** Produziert Tokens bei Sonnenschein
- **Windturbine:** Funktioniert besser bei Wind
- **Wasserrad (Hydro):** Stetiger Output, aber störanfällig bei Hochwasser

> Alle Energiequellen geben **alle 5 Sekunden 1 Token aus**, wenn aktiv  
> Spieler holen Tokens und bringen sie zur **Zentrale (Grid Storage)**

---

### 2. 🚨 Obstacle-System (Zufallsereignisse)
- **Sturm:** Deaktiviert Solarpanels für 30 Sek.
- **Turbinen-Ausfall:** Gerät fällt aus, muss repariert werden
- **Energie-Peak:** Stadt verbraucht vorübergehend mehr Energie

> Zufallsereignisse alle **60 Sekunden**  
> Ereignisse als KI-generierte Warnung: „⚠️ Sturm nähert sich!“

---

### 3. 👥 Rollen im Koop
(Optional – zur Orientierung)
- **Collector:** Holt Tokens von Energiequellen
- **Engineer:** Repariert defekte Quellen
- **Strategist:** Beurteilt Warnungen & priorisiert Aufgaben
- **Grid Manager:** Überwacht Speicher und Balance zwischen Quellen und Verbrauchern

> Keine feste Zuweisung nötig – alle Spieler können alle Aufgaben übernehmen

---

### 4. 🔋 Verbraucher-System (Energy Consumers)
Verbraucher ziehen automatisch Energie-Tokens aus dem Grid:

| Verbraucher          | Verbrauchsrate     | Wirkung bei Ausfall                    |
|----------------------|--------------------|----------------------------------------|
| Krankenhaus          | 5 Tokens / 10 Sek  | -2 Punkte bei Stromausfall             |
| E-Auto-Ladestation   | 3 Tokens / 10 Sek  | Zeitstrafe (z. B. -10 Sekunden         |
| Fabrik               | 10 Tokens / 15 Sek | Zeitstrafe (z. B. -30 Sekunden)        |

#### Verhalten:
- Wenn nicht genug Energie im Speicher:
  - Punktabzug oder
  - Fortschrittsverlust
  - **5 Ausfälle = Game Over**

> Verbraucher haben **sichtbare Balken (UI)** und verbrauchen **passiv Energie**

---

### 5. 🤖 AI-Integration
- **Copilot/GPT im Spiel:** Spieler erhalten „kaputten Code“ und müssen ihn korrigieren (z. B. `FixTurbine()`).
- **Event-Generator:** AI simuliert dynamische Ereignisse (z. B. „Ein Sturm kommt von Westen“)
- **Balance-Test:** AI kann verschiedene Szenarien durchrechnen

---

## 🏁 Spielziel
- Sammle und liefere **100 Energie-Tokens** zur Zentrale  
- Halte die Stadt **am Laufen**, ohne 5 Verbraucher ausfallen zu lassen  
- Zeitlimit: **5 Minuten**

---

## ✅ Hackathon Requirements

### Must-Have (Tag 1)
- [x] Energiequellen & Tokens  
- [x] Token-Sammel- & Abliefer-Mechanik  
- [x] Grid mit max. Speicher  
- [x] Verbraucher ziehen Energie  
- [x] 1–2 Zufallsereignisse (Sturm, Defekt)  
- [x] Sieg-/Niederlagebedingungen  
- [x] Online Koop mit 2–4 Spielern

---

## 💡 Beispiel-Flow

1. Spieler starten auf einer Map mit drei Energiequellen  
2. Ereignis-Countdown läuft (z. B. „Sturm in 60s“)  
3. Spieler liefern Tokens ab  
4. Verbraucher verbrauchen Energie → Warnsystem bei Engpass  
5. Defekt tritt auf → Engineer muss reparieren  
6. Wenn Grid leer oder 5 Verbraucher ausfallen → Game Over  
7. Ziel: 100 Tokens in 5 Min abliefern und Stadt am Laufen halten

---
