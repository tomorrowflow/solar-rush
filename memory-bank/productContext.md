# Product Context

This file provides a high-level overviewbased on project brief:

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
