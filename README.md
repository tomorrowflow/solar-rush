# Energy Rush: Solar Sprint

Welcome to **Energy Rush: Solar Sprint**! This project is a cooperative game focused on renewable energy management, team coordination, and overcoming environmental challenges. Players work together to gather energy from solar, wind, and hydro sources, manage a shared energy grid, and respond to obstacles like storms and equipment failures.

This game is being developed as part of an **AI-First Hackathon**. The development process emphasizes the use of AI tools for various tasks, from code generation to asset creation, following the guidelines outlined in [`How to Play.md`](How%20to%20Play.md:).

## AI Jump-Start
*   **Goal of the session** Everyone experiences AI interaction on AI topics, the whole group will learn about the golden nuggets.
*   **Understand AI on various levels** Create groups with mixed AI experience (AI engineer, AI user, AI enthusiast, AI newbees), quick exchange on the following topics: prompts, use cases that you tried
*   **Transcribe video** Each group picks one ~15min video and watches it in a group. Pay attention to the time references if given, to keep it short and stay focussed. Create a video transcritpt via [`youtube-transcript.io`](http://youtube-transcript.io/). Hint: the download is accessable through the thee dots beside the *Copy Transcript*, do not include Time. Save the transcript in `/transcripts`.
*   **Chat about video content** Feed the transcript into AI chat of your choice with the following prompt:

    > You are now a knowledgeable and friendly teammate who has just watched the same video as this group. Based on the transcript below, engage with the group as their collaborative discussion partner. 
    >
    >Your role:
    >- Help the group unpack the key concepts from the video using accessible language
    >- Ask thoughtful questions to guide their thinking
    >- Share relevant insights that connect to the video content
    >- Address the group collectively (use "you all," "the group," etc.)
    >- Encourage different perspectives and build on their responses
    >
    >Start by acknowledging what you all just watched together, highlight 2-3 main themes you noticed, and ask an engaging question to get the conversation going.
    > Find the transcript attached as file.
*   **Summary and golden nuggets** Create a insights summary of your conversation highlighting the main insights (golden nuggets). Save the summary in `/insights` as markdown file. Gather all groups, each group shares 1-3 golden nuggets and answer two questions. 
    *   *What assumption about how AI works turned out to be different from what you thought, and why does that matter?*
    *   *Based on what you learned, what's one thing people should start doing differently when working with AI?*
*   Have a break and let the new learning sink in.

## Game Overview

(this repo focusses on a game, you can work alternatively on your individual use cases. Recommendation is to stay close with the rules in [`/How to play.md`](<How to play.md>) )
*   **Core Concept:** A collaborative game where players manage renewable energy resources.
*   **Gameplay:** Involves collecting energy tokens, managing grid capacity, dealing with dynamic obstacles (environmental hazards, system failures, demand spikes), and coordinating team roles (Energy Collectors, Engineers, Dispatchers, Monitors).
*   **Inspiration:** Draws inspiration from games like Eco (sustainability), Factorio (resource management), and Overcooked (cooperative action).

## Project Structure

*   **`/game_specs`**: Contains detailed information about the game:
    *   [`game_specs/energy_rush.md`](<game_specs/energy_rush.md>): An overview of the game design, technical architecture, and initial implementation plan.
    *   [`game_specs/game_mechanics.md`](<game_specs/game_mechanics.md>): A detailed breakdown of core game mechanics, including energy collection, obstacle management, team roles, and AI integration.
    *   [`game_specs/implementation_plan.md`](<game_specs/implementation_plan.md>): A phased development plan for the game.
*   **`/everything_AI`**: Contains notes and resources related to AI concepts and tools used in the hackathon (e.g., LLM Key Concepts, MCP Server, Memory Bank).
*   **`/installation`**: Contains configuration files for AI assistant tooling (e.g., [`mcp_settings.json`](<installation/mcp_settings.json>), [`kilo-code-settings.json`](<installation/kilo-code-settings.json>)).
*   **`/transcripts`**: Contains text versions of AI-related educational content which can be used to enrich prompts or start investigating the concepts.
*   [`How to Play.md`](<How%20to%20Play.md>): Guidelines and rules for the AI-First Hackathon.

## Development Approach

The development follows an AI-First methodology, leveraging tools for coding, documentation, and potentially asset generation. The project is planned in phases, starting from design finalization and prototyping, moving through technical setup and core feature development, to full feature implementation, testing, and deployment.

For more detailed information, please refer to the documents within the [`game_specs/`](game_specs/) directory.