# ObsidianAI

**Network-Aware Intelligence Layer for Enterprise Security**  
*Zero-trust + xAI Grok agents for Orlando hospitality, healthcare, and beyond.*

[![GitHub Stars](https://img.shields.io/github/stars/abowden101/ObsidianAI)](https://github.com/abowden101/ObsidianAI/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-black)
![xAI Grok](https://img.shields.io/badge/Powered%20by-xAI%20Grok-black)

**Live Site:** [https://obsidianai.org](https://obsidianai.org)  
**Backend:** [https://obsidianai-evtu.onrender.com](https://obsidianai-evtu.onrender.com)

ObsidianAI connects **xAI Grok** directly to your networks and operations. Real-time threat analysis, natural-language firewall rules, config audits, and autonomous inventory planning tailored for Orlando resorts and enterprises.

### Quick Start

```bash
git clone https://github.com/abowden101/ObsidianAI.git
cd ObsidianAI
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your XAI_API_KEY from https://x.ai/api
python seed_db.py
uvicorn app:app --reload --port 8000
