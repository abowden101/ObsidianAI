-- ObsidianAI PostgreSQL schema
-- Safe to run on every startup — all tables are idempotent.

CREATE TABLE IF NOT EXISTS clients (
    client_id   SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    contact_email TEXT UNIQUE,
    service_tier  TEXT CHECK (service_tier IN ('Foundation', 'Obsidian Core', 'Enterprise')),
    location      TEXT DEFAULT 'Orlando, FL',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS network_assets (
    asset_id      SERIAL PRIMARY KEY,
    client_id     INTEGER REFERENCES clients(client_id) ON DELETE CASCADE,
    device_type   TEXT,          -- e.g. 'Cisco Meraki MX', 'Palo Alto PA-440'
    serial_number TEXT UNIQUE,
    ip_address    TEXT,
    status        TEXT DEFAULT 'active',
    added_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_logs (
    log_id               SERIAL PRIMARY KEY,
    client_id            INTEGER REFERENCES clients(client_id) ON DELETE SET NULL,
    service_type         TEXT,   -- e.g. 'threat_analysis', 'inventory_plan', 'chat'
    model_used           TEXT DEFAULT 'grok-beta',
    prompt_token_count   INTEGER,
    response_token_count INTEGER,
    interaction_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data (idempotent via ON CONFLICT DO NOTHING)
INSERT INTO clients (client_id, company_name, contact_email, service_tier)
VALUES
    (1, 'Grand Orlando Resort & Spa',       'it@grandorlando.example',  'Obsidian Core'),
    (2, 'Universal Theme Park Operations',  'netops@universal.example', 'Enterprise'),
    (3, 'Downtown Orlando Medical Group',   'it@oomg.example',          'Foundation')
ON CONFLICT (client_id) DO NOTHING;
