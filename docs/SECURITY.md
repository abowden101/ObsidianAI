# ObsidianAI Security & Privacy Framework

---

## Data Handling

ObsidianAI acts as an orchestration layer. Client network data is not stored by default.

- **Transit encryption** — All data in transit uses TLS 1.3
- **Model privacy** — xAI Enterprise API queries are stateless; no client data enters the global Grok training set
- **Report storage** — Optional S3 storage uses AES-256 server-side encryption with pre-signed URLs (1-hour expiry)

---

## Infrastructure Security

- **Rate limiting** — All endpoints rate-limited (10 req/min on /chat, 5/min on /upload-report)
- **Security headers** — X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Content-Security-Policy on every response
- **CORS** — Restricted to obsidianai.org and abowden101.github.io
- **Secrets** — All credentials loaded from environment variables; never hardcoded

---

## Compliance Roadmap

| Standard | Target | Status |
|---|---|---|
| SOC 2 Type II | Q4 2026 | Planned |
| ISO 27001 | Q4 2026 | Planned |
| HIPAA-ready architecture | Q3 2026 | In progress |
| PCI-DSS guidance | Q3 2026 | In progress |

---

## Responsible Disclosure

Found a vulnerability? Email [team@obsidianai.org](mailto:team@obsidianai.org) with subject `[SECURITY]`. We respond within 48 hours.
