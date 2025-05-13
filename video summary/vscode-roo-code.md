# 🛠️ Roo Code Setup & Memory Bank Anleitung

## 📘 Einleitung

**Roo Code** ist eine KI-gestützte Entwicklungsumgebung für Visual Studio Code, die dich beim Programmieren, Planen, Debuggen und Dokumentieren unterstützt. Damit Roo Code den Projektkontext versteht und über längere Zeit sinnvoll mitdenken kann, gibt es die **Memory Bank**.

Die Memory Bank besteht aus Markdown-Dateien, die Informationen über den Projektstatus, den Fortschritt, offene Entscheidungen und den Produktschwerpunkt festhalten. Diese Informationen ermöglichen es Roo Code, bei jeder neuen Anfrage auf bereits bekannte Fakten zurückzugreifen – wie ein Gedächtnis.

---

## 🔧 Voraussetzungen

- **Visual Studio Code** (VS Code)
- **Roo Code Extension** installiert (siehe unten)
- Optional: OpenRouter API-Key oder lokales Modell über [Ollama](https://ollama.com/)

---

## 🪄 Roo Code Extension installieren

1. Öffne VS Code
2. Öffne den Extensions-Tab (`Strg + Umschalt + X`)
3. Suche nach `Roo Code`
4. Installiere die Erweiterung (Publisher: Roo Veterinary Inc.)
5. Starte VS Code neu

---

## 🔐 API-Zugang konfigurieren

Roo Code benötigt ein LLM (Language Model), z. B. über OpenRouter:

1. Öffne Roo Code Panel → ⚙️ → **Providers**
2. Wähle `OpenRouter` als API Provider
3. Trage deinen OpenRouter API-Key ein
4. Wähle ein unterstütztes Modell (z. B. `mistralai/mixtral-8x7b` oder `gpt-4`)
5. Schließe das Einstellungsfenster

> ⚠️ Hinweis: `claude-3-sonnet` funktioniert, **aber unterstützt keine „computer use“**, was Roo Code in einigen Modi benötigt.

---

## 📂 Projekt vorbereiten

1. Öffne deinen Projektordner in VS Code
2. Lege die Datei `projectBrief.md` im Stammverzeichnis an, z. B.:

```markdown
## Projektübersicht
Dies ist ein Testprojekt zum Ausprobieren von Roo Code und der Memory Bank.

- Sprache: TypeScript
- Ziel: Test der automatisierten Codeunterstützung
```

3. Klone das offizielle Memory-Bank-Repository:

```bash
git clone https://github.com/GreatScottyMac/roo-code-memory-bank
```

4. Kopiere die benötigten Dateien aus dem geklonten Ordner in dein Projektverzeichnis:

- `.clinerules-code`
- `.clinerules-architect`
- `.clinerules-debug`
- `.clinerules-ask`
- `.roomodes`
- den Ordner `memory-bank/` mit seinen Dateien


3. Erstelle manuell oder kopiere aus dem Repo [roo-code-memory-bank](https://github.com/GreatScottyMac/roo-code-memory-bank) folgende Dateien:

```
.
├── projectBrief.md
├── .clinerules-code
├── .clinerules-architect
├── .clinerules-debug
├── .clinerules-ask
├── .roomodes
└── memory-bank/
    ├── activeContext.md
    ├── productContext.md
    ├── progress.md
    └── decisionLog.md
```

Du kannst die `memory-bank/`-Dateien auch manuell anlegen – sie sind einfache leere Markdown-Dateien mit einer Überschrift wie `# Progress`.

---

## 🚀 Roo Code starten

1. Öffne das Roo Code Panel (links in der Seitenleiste)
2. Gib folgenden Befehl ein:
   ```
   hello
   ```
3. Roo Code sollte jetzt:
   - die Memory Bank aktivieren
   - ggf. den `projectBrief.md` einlesen
   - dich begrüßen (wenn ein funktionierendes Modell verbunden ist)

---

## 🧠 Was die einzelnen Memory-Bank-Dateien tun

| Datei                      | Funktion                                                                 |
|---------------------------|--------------------------------------------------------------------------|
| `activeContext.md`        | Aktueller Fokus, Fragen, Entscheidungen                                 |
| `productContext.md`       | Produktbeschreibung, Ziel des Projekts                                  |
| `progress.md`             | Abgeschlossene und offene Aufgaben                                      |
| `decisionLog.md`          | Begründete Designentscheidungen im Verlauf der Arbeit                   |

Diese Dateien werden von Roo Code automatisch gelesen und aktualisiert – du kannst sie aber auch manuell pflegen.

---

## 💡 Tipps

- Gib regelmäßig `UMB` ein, um die Memory Bank zu aktualisieren
- Verwende klare, kurze Commit Messages – Roo Code nutzt sie zur Einordnung
- Halte `projectBrief.md` aktuell, besonders wenn sich Ziele oder Technologien ändern

---

## ✅ Beispielprojekt

Dieses Projekt (`test`) dient als minimaler Einstieg zum Testen von Roo Code in TypeScript. Es ist bewusst einfach gehalten, um die Funktionsweise der Memory Bank zu verstehen.

---

## 📎 Weiterführende Links

- [Roo Code GitHub](https://github.com/GreatScottyMac/roo-code-memory-bank)
- [OpenRouter](https://openrouter.ai)
- [Ollama (lokales LLM)](https://ollama.com)