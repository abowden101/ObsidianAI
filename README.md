# ObsidianAI

**Network-Aware Intelligence Layer for Enterprise Security**

Bridges large language models and enterprise infrastructure. Real-time threat synthesis, automated incident response, and zero-trust architecture — powered by xAI Grok.

---

## Stack

| Layer | Technology |
|---|---|
| AI | xAI Grok (via OpenAI-compatible API) |
| Backend | FastAPI + Uvicorn |
| Rate limiting | SlowAPI |
| Database | PostgreSQL (prod) / SQLite (dev) |
| Storage | AWS S3 |
| Frontend | Vanilla HTML/CSS/JS |
| Deploy | Render (backend) · GitHub Pages (frontend) |

---

## Project Structure

```
obsidianai/
├── app.py                  # FastAPI backend — /chat, /health, /clients, /upload-report
├── agent.py                # Core ObsidianAgent class (threat analysis, firewall gen, audits)
├── hospitality_agent.py    # Hotel inventory automation agent
├── seed_db.py              # Local SQLite seed script
├── init.sql                # PostgreSQL schema (runs on backend startup)
├── requirements.txt
├── .env.example
├── index.html              # Frontend (deployed to GitHub Pages)
├── robots.txt
├── CNAME
└── docs/
    ├── ROADMAP.md
    └── SECURITY.md
```

---

## Local Setup

```bash
# 1. Clone and install
git clone https://github.com/abowden101/ObsidianAI.git
cd ObsidianAI
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Fill in XAI_API_KEY at minimum

# 3. Seed local database (optional)
python seed_db.py

# 4. Run backend
uvicorn app:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `XAI_API_KEY` | ✓ | xAI API key from [x.ai/api](https://x.ai/api) |
| `DATABASE_URL` | — | PostgreSQL connection string (Render / Supabase) |
| `AWS_ACCESS_KEY_ID` | — | For S3 report storage |
| `AWS_SECRET_ACCESS_KEY` | — | For S3 report storage |
| `AWS_REGION` | — | Default: `us-east-1` |
| `S3_BUCKET` | — | Bucket name for report uploads |

---

## API Endpoints

```
GET  /           Status + feature flags
GET  /health     Health check
POST /chat       { "message": "..." } → { "reply": "..." }
POST /upload-report  Generate + store report to S3
GET  /clients    List clients from database
```

---

## Roadmap

**Q1 2026** — Foundation ✓  
xAI integration · Web CLI · GitHub/Render deploy

**Q2 2026** — Agentic Expansion  
Cisco Catalyst API · Palo Alto Networks API · Automated firewall policy · First MSP pilot

**Q3 2026** — Autonomous SOC  
Obsidian Sentry (24/7 syslog agent) · White-label portal · Seed round

---

## Contact

**Antonio Bowden** · [team@obsidianai.org](mailto:team@obsidianai.org)  
[obsidianai.org](https://obsidianai.org) · [LinkedIn](https://www.linkedin.com/in/antonio-bowden) · [GitHub](https://abowden101.github.io/ObsidianAI)
