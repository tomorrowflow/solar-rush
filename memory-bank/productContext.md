# Product Context

This file provides a high-level overviewbased on project brief:

# Energy Rush: Solar Sprint

A cooperative multiplayer game focused on renewable energy management and team coordination. Players work together to collect energy from renewable sources (solar, wind, hydro), manage obstacles (environmental hazards, system failures, demand spikes), and coordinate as a team with different roles (Energy Collectors, Engineers, Dispatcher, Monitor).

The game is inspired by Eco (sustainability), Factorio (resource management), and Overcooked (cooperative action). It features detailed energy collection rules, obstacle management systems, and team roles & collaboration mechanics.

The implementation plan is divided into phases:
1. Game Design Finalization & Prototyping
2. Technical Foundation & Core Feature Development
3. Feature Expansion, UI/UX Implementation, and Iteration
4. Testing & Deployment

The tech stack includes options for Phaser.js (2D) or Unity (3D), with JavaScript/TypeScript, WebGL, Node.js, WebSocket, and MongoDB.

...

*
=======
# Energy Rush: Solar Sprint Implementation Plan

A team-based renewable energy management game focusing on coordination and resource optimization.

...

*
[2025-05-13 11:09:04] - ## Game Specifications

### Core Mechanics
- **Energy Collection**
  - Players gather energy tokens from renewable sources (solar, wind, hydro)
  - Energy storage with limited grid capacity
  - Balancing collection and storage to avoid overloads/blackouts

- **Obstacle Management**
  - Environmental Hazards:
    - Storms blocking solar panels
    - Strong winds damaging turbines
    - Floods disrupting hydro systems
  - System Failures:
    - Equipment malfunctions requiring quick fixes
  - Demand Spikes:
    - Sudden increases in energy usage

### Team Coordination Mechanics
- **Roles & Responsibilities**
  - Energy Collectors: Gather energy tokens
  - Engineers: Repair equipment and manage obstacles
  - Dispatcher: Coordinate team efforts and prioritize tasks
  - Monitor: Track energy levels and system status

- **Communication Systems**
  - In-game chat with voice communication options
  - Visual indicators for player status and task assignments
  - Shared UI elements showing team progress and goals

### Technical Architecture
- **Frontend**: JavaScript/TypeScript with WebGL
- **Backend**: Node.js with WebSocket
- **Database**: MongoDB for game state and player data

### Testing Strategy
- Unit testing for individual components
- Integration testing for subsystem interactions
- Automated CI/CD pipeline for testing and deployment
