# Local AI Engineering Stack - Installation Guide

This guide sets up a complete local AI engineering environment with advanced coding assistance, vector search capabilities, and MCP (Model Context Protocol) integration.

## Stack Overview

- **VSCode** - Primary code editor
- **KiloCode** - AI coding assistant with multi-mode support
- **Docker Desktop** - Container management with MCP Toolkit
- **Docker MCP Toolkit** - Model Context Protocol server management
- **Ollama** - Local AI model runtime
- **Qdrant** - Vector database for embeddings and codebase indexing

## Prerequisites

- macOS, Windows, or Linux
- either NVIDIA GPU (4GB VRAM) or Apple Silocon for local Codebase Indexing
- At least 8GB RAM (16GB+ recommended)

## Installation Steps

### 1. Install Docker Desktop

**Mac/Windows/Linux:**
Download and install from [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Verify installation:**
```bash
docker --version
docker-compose --version
```

### 2. Install VSCode

Download and install from [Visual Studio Code](https://code.visualstudio.com/)

### 3. Install KiloCode Extension

1. Open VSCode
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Kilo Code AI Agent"
4. Install the extension by `kilocode.Kilo-Code`
5. After installation, click "Try Kilo Code for Free"
6. Sign in with your Google account
7. Follow the authorization flow to connect KiloCode to VSCode

### 4. Install Ollama

**macOS:**
```bash
# Via Homebrew
brew install ollama

# Start Ollama service
brew services start ollama
```

**Windows/Linux:**
```bash
# Download and install from: https://ollama.ai/download
curl -fsSL https://ollama.ai/install.sh | sh
```

**Pull the embedding model:**
```bash
# Pull the nomic-embed-text model for embeddings
ollama pull nomic-embed-text:latest

# Verify installation
ollama list
```

### 5. Setup Qdrant Vector Database

**Run Qdrant with Docker:**
```bash
# Create data directory
mkdir -p ./qdrant_storage

# Run Qdrant container
docker run -d \
  --name qdrant \
  -p 6333:6333 \
  -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage:z \
  qdrant/qdrant
```

**Verify Qdrant is running:**
```bash
curl http://localhost:6333/health
# Should return: {"status":"ok"}
```

### 6. Setup Docker MCP Toolkit

1. Open Docker Desktop
2. Navigate to the **MCP Toolkit** section in the sidebar
3. Browse the **Catalog** tab to explore available MCP servers
4. Install recommended MCP servers, add API keys if needed:
   - **Context7 MCP Server** (Up-to-date code documentation for LLMs and AI code editors)
   - **curl** (Standard curl tool for HTTP requests)
   - **Fetch (Reference)** (Fetches a URL from the internet and extracts its contents as markdown)
   - **Brave Search** (Search the Web for pages, images, news, videos, and more using the Brave Search API - needs API key)
   - **GitHub Official** (Provides seamless integration with GitHub APIs, enabling advanced automation and interaction capabilities for developers and tools - needs API key/Oauth)


### 7. Configure MCP Settings

Create or update your global MCP settings file in KiloCode MCP settings (pile icon in top menu bar in KiloCode).

Copy the provided `mcp_settings.json` content to this file, or use this configuration:

```json
{
  "mcpServers": {
    "MCP_DOCKER": {
      "command": "docker",
      "args": [
        "mcp",
        "gateway",
        "run"
      ],
      "type": "stdio"
    }
  }
}
```

### 8. Import KiloCode Configuration

1. Open VSCode with KiloCode installed
2. Open KiloCode settings (click the KiloCode icon in sidebar → Settings)
3. Import the provided `kilo-code-settings.json` configuration
4. This will configure:
   - Ollama integration for local models
   - Qdrant connection for codebase indexing
   - Optimal settings for the AI coding workflow

**Key configuration highlights:**
- **Embedding Model:** `nomic-embed-text:latest` via Ollama
- **Vector Database:** Qdrant at `http://localhost:6333`
- **Codebase Indexing:** Enabled with 768-dimension embeddings
- **MCP Integration:** Enabled for tool extensibility

## Verification & Testing

### 1. Test Ollama + Embedding Model
```bash
# Test embedding generation
curl http://localhost:11434/api/embeddings -d '{
  "model": "nomic-embed-text",
  "prompt": "This is a test embedding"
}'
```

### 2. Test Qdrant
```bash
# Create a test collection
curl -X PUT "http://localhost:6333/collections/test" \
  -H "Content-Type: application/json" \
  -d '{
    "vectors": {
      "size": 768,
      "distance": "Cosine"
    }
  }'
```

### 3. Test KiloCode
1. Open a project in VSCode
2. Open KiloCode panel (sidebar icon)
3. Click Codebase Indexing icon in the chat window (database icon)
4. Check configuration of Ollama and Qdrant - Status should show green
5. Try a simple request: "Explain this codebase structure"
6. Verify codebase indexing is working in settings

### 4. Test MCP Integration
1. In Docker Desktop, go to MCP Toolkit
2. Connect your preferred AI client (Claude, Cursor, etc.)
3. Test MCP server functionality

## Usage Tips

**KiloCode Modes:**
- **Ask Mode:** General questions about code
- **Code Mode:** Generate and modify code
- **Architect Mode:** Plan project structure
- **Debug Mode:** Troubleshoot and fix issues

**Codebase Indexing:**
- Enable automatic indexing in KiloCode settings
- Index will be built using Qdrant + nomic-embed-text
- Provides semantic code search and context-aware assistance

**MCP Servers:**
- Extend AI capabilities with specialized tools
- Manage via Docker Desktop's MCP Toolkit
- Share configurations across different AI clients

## Troubleshooting

**Ollama not responding:**
```bash
# Restart Ollama service
ollama serve

# Check if model is available
ollama list
```

**Qdrant connection issues:**
```bash
# Check if container is running
docker ps | grep qdrant

# Restart if needed
docker restart qdrant
```

**KiloCode authentication:**
- Ensure you're signed into kilocode.ai
- Check VS Code is authorized to open external URLs
- Restart VS Code if connection issues persist

## Next Steps

1. **Explore MCP Servers:** Install additional tools from Docker MCP Catalog
2. **Customize KiloCode:** Create custom modes for your specific workflows
3. **Integration:** Connect with your existing development tools and workflows

## Support & Resources

- **KiloCode:** [Documentation](https://kilocode.ai/docs/) | [GitHub](https://github.com/Kilo-Org/kilocode)
- **Docker MCP:** [Documentation](https://docs.docker.com/ai/mcp-catalog-and-toolkit/)
- **Qdrant:** [Documentation](https://qdrant.tech/documentation/)
- **Ollama:** [Documentation](https://ollama.ai/docs)