# ObsidianAI

**Network-Aware Intelligence Layer for Enterprise Security**  
*Zero-trust + xAI Grok agents for Orlando hospitality, healthcare, and beyond.*

[![GitHub Stars](https://img.shields.io/github/stars/abowden101/ObsidianAI)](https://github.com/abowden101/ObsidianAI/stargazers)
[![License](https://img.shields.io/github/license/abowden101/ObsidianAI)](LICENSE)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-black)
![xAI Grok](https://img.shields.io/badge/Powered%20by-xAI%20Grok-black)

**Live site:** [obsidianai.org](https://obsidianai.org)  
**Backend demo:** [chat widget on site](https://obsidianai.org)  
**Backend URL:** `https://obsidianai-evtu.onrender.com`

ObsidianAI bridges **xAI Grok** directly to your network infrastructure. Real-time threat synthesis, natural-language firewall rules, autonomous inventory for hotels, and zero-trust everything — built in Orlando.

### Quick Start
```bash
git clone https://github.com/abowden101/ObsidianAI.git
cd ObsidianAI
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# → Add your XAI_API_KEY
python seed_db.py
uvicorn app:app --reload --port 8000
