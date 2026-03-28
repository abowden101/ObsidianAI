# ObsidianAI

**MSP + SaaS Security Platform for Orlando Businesses**

[![Live Site](https://img.shields.io/badge/Live-obsidianai.org-black)](https://obsidianai.org)
[![Backend](https://img.shields.io/badge/Backend-Render-black)](https://obsidianai-evtu.onrender.com)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-black)
![xAI Grok](https://img.shields.io/badge/Powered%20by-xAI%20Grok-black)

ObsidianAI combines hands-on managed security with a SaaS platform — dedicated engineer + AI platform that never sleeps. Built for Orlando hospitality, healthcare, and enterprise. Nationwide remote available.

---

## Stack

| Layer | Technology |
|---|---|
| AI | xAI Grok (via OpenAI-compatible API) |
| Backend | FastAPI + Uvicorn on Render |
| Frontend | Vanilla HTML/CSS/JS on GitHub Pages |
| Database | PostgreSQL (prod) / SQLite (dev) |
| Storage | AWS S3 (optional) |
| Domain | obsidianai.org via Cloudflare |

---

## Project Structure

```
ObsidianAI/
├── index.html              # Single-page frontend (GitHub Pages)
├── style.css               # All styles
├── script.js               # Chat widget, form AJAX, scroll animations
├── app.py                  # FastAPI backend — /chat, /health, /clients
├── agent.py                # ObsidianAgent — threat analysis, firewall gen, audits
├── hospitality_agent.py    # Hotel inventory automation agent
├── seed_db.py              # Local SQLite seed
├── init.sql                # PostgreSQL schema (runs on backend startup)
├── requirements.txt
├── .env.example
├── robots.txt
├── sitemap.xml
├── CNAME                   # obsidianai.org
└── docs/
    ├── ROADMAP.md
    └── SECURITY.md
```

---

## Local Setup

```bash
git clone https://github.com/abowden101/ObsidianAI.git
cd ObsidianAI
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your XAI_API_KEY from https://x.ai/api
python seed_db.py
uvicorn app:app --reload --port 8000
```

Backend: `http://localhost:8000`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `XAI_API_KEY` | Yes | xAI API key from x.ai/api |
| `DATABASE_URL` | No | PostgreSQL connection string |
| `AWS_ACCESS_KEY_ID` | No | S3 report storage |
| `AWS_SECRET_ACCESS_KEY` | No | S3 report storage |
| `S3_BUCKET` | No | Bucket name for reports |

---

## API Endpoints

```
GET  /              Status + feature flags
GET  /health        Health check
POST /chat          { "message": "..." } → { "reply": "..." }
POST /upload-report Generate + store report to S3
GET  /clients       List clients from database
```

---

## Business Model

ObsidianAI operates as an **MSP + SaaS hybrid**:

- **Managed Layer** — On-site Orlando engineer + remote SOC
- **Platform Layer** — Client dashboard, live alerts, audit logs
- **AI Layer** — xAI Grok for real-time threat synthesis

| Tier | Price | Target |
|---|---|---|
| Foundation | $1,995/mo | SMBs |
| Obsidian Core | $2,995–6,995/mo | Mid-market (~$42K ARR) |
| Enterprise | Custom | Multi-site / MSP resellers |

---

## Roadmap

**Q1 2026** — Foundation ✓  
**Q2 2026** — Node.js backend, JWT auth, PostgreSQL client DB, client portal, Stripe billing  
**Q3 2026** — Obsidian Sentry (autonomous SOC agent), white-label portal  
**Q4 2026** — MSP partner network, $500K ARR target, seed round  

---

## Contact

**Antonio Bowden** · [team@obsidianai.org](mailto:team@obsidianai.org)  
[obsidianai.org](https://obsidianai.org) · [LinkedIn](https://www.linkedin.com/in/antonio-bowden) · [GitHub](https://github.com/abowden101)
