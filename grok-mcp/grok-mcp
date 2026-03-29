@echo off
title ObsidianAI Grok MCP Server for Claude Desktop

echo ================================================
echo  ObsidianAI Grok MCP Server (for Claude Desktop)
echo ================================================
echo.

if not exist ".env" (
    echo [ERROR] .env file not found!
    echo Please create .env with your XAI_API_KEY first.
    pause
    exit /b
)

echo Starting Grok MCP server on port 3000...
echo You can now connect Claude Desktop to: http://localhost:3000
echo.

node server.js

pause
