"""SQLite seed for local dev. Run once: python seed_db.py"""
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "clients.db"

def seed():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.executescript("""
        CREATE TABLE IF NOT EXISTS clients (
            client_id    INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT NOT NULL,
            contact_email TEXT UNIQUE,
            service_tier  TEXT,
            location      TEXT DEFAULT 'Orlando, FL',
            created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS network_assets (
            asset_id      INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id     INTEGER REFERENCES clients(client_id),
            device_type   TEXT,
            serial_number TEXT UNIQUE,
            ip_address    TEXT,
            status        TEXT DEFAULT 'active'
        );
        CREATE TABLE IF NOT EXISTS ai_logs (
            log_id               INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id            INTEGER,
            service_type         TEXT,
            model_used           TEXT DEFAULT 'grok-beta',
            prompt_token_count   INTEGER,
            response_token_count INTEGER,
            interaction_date     DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    """)
    c.executemany(
        "INSERT OR IGNORE INTO clients (client_id, company_name, contact_email, service_tier) VALUES (?,?,?,?)",
        [
            (1, "Grand Orlando Resort & Spa",      "it@grandorlando.example",  "Obsidian Core"),
            (2, "Universal Theme Park Operations", "netops@universal.example", "Enterprise"),
            (3, "Downtown Orlando Medical Group",  "it@oomg.example",          "Foundation"),
        ],
    )
    conn.commit()
    conn.close()
    print(f"Database seeded at {DB_PATH}")

if __name__ == "__main__":
    seed()
