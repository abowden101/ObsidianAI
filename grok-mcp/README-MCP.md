# Grok MCP Server for Claude Desktop

This folder runs a local MCP (Model Context Protocol) server so you can use **Grok** directly inside **Claude Desktop** on Windows.

### How to Use

1. Copy `.env.example` to `.env`
2. Put your real `XAI_API_KEY` in the `.env` file
3. Double-click `start-grok-mcp.bat`
4. In Claude Desktop:
   - Go to Settings → MCP Servers
   - Add new server:
     - Name: ObsidianAI Grok
     - URL: `http://localhost:3000`
   - Save and enable

Now you can use Grok inside Claude Desktop with full tool use.

### How to Update
```bash
cd grok-mcp
git pull origin main   # or however you keep it updated
