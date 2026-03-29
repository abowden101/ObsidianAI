# ObsidianAI

**Network-Aware Intelligence Layer for Enterprise Security**  
*Zero-trust + xAI Grok agents for Orlando hospitality, healthcare, and beyond.*

[![Live Site](https://img.shields.io/badge/Live-obsidianai.org-black)](https://obsidianai.org)
[![Backend](https://img.shields.io/badge/Backend-Render-black)](https://obsidianai-evtu.onrender.com)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-black)
![xAI Grok](https://img.shields.io/badge/Powered%20by-xAI%20Grok-black)

ObsidianAI bridges **xAI Grok** directly to your network infrastructure and operations. Real-time threat synthesis, natural-language firewall rules, config audits, and autonomous inventory planning for Orlando resorts.

Built in Orlando, FL — serving hospitality, healthcare, SMBs, and enterprise clients nationwide.

---

## Quick Start (Local)

```bash
git clone https://github.com/abowden101/ObsidianAI.git
cd ObsidianAI
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your XAI_API_KEY
python seed_db.py
uvicorn app:app --reload --port 8000
