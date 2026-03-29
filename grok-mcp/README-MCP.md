# Grok MCP Server for Claude Desktop

This folder runs a local MCP (Model Context Protocol) server so you can use **Grok** (xAI) directly inside **Claude Desktop** on Windows.

### Quick Start (Windows)

1. Copy `.env.example` to `.env`
2. Paste your real `XAI_API_KEY` into the `.env` file
3. Double-click `start-grok-mcp.bat`
4. In Claude Desktop:
   - Settings → MCP Servers → Add new server
   - Name: `ObsidianAI Grok`
   - URL: `http://localhost:3000`
   - Save and enable

Now you can use Grok with full tool calling inside Claude Desktop.

### Files
- `start-grok-mcp.bat` — One-click launcher
- `server.js` — The actual MCP server
- `.env.example` — Configuration template

Made for ObsidianAI by Antonio Bowden.
