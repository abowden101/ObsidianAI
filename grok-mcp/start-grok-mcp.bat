@echo off
title ObsidianAI Grok MCP Server - For Claude Desktop

echo ================================================
echo   ObsidianAI Grok MCP Server (Claude Desktop)
echo ================================================
echo.

if not exist ".env" (
    echo [ERROR] .env file not found!
    echo Please copy .env.example to .env and add your XAI_API_KEY.
    pause
    exit /b
)

echo Starting Grok MCP server on http://localhost:3000
echo Connect Claude Desktop to this URL.
echo Press Ctrl+C to stop the server.
echo.

node server.js

pause
