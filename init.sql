-- Client Management
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    service_tier TEXT CHECK (service_tier IN ('Foundation', 'Obsidian Core', 'Enterprise')),
    onboarding_date DATE DEFAULT CURRENT_DATE
);

-- Hardware Inventory (Cisco & Palo Alto)
CREATE TABLE network_inventory (
    hardware_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(client_id),
    make TEXT, -- e.g., 'Palo Alto'
    model TEXT, -- e.g., 'PA-440'
    serial_number TEXT UNIQUE,
    status TEXT DEFAULT 'deployed'
);

-- AI Usage Tracking (for xAI/Grok billing)
CREATE TABLE ai_service_logs (
    log_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(client_id),
    service_type TEXT, -- e.g., 'Custom Code Agent'
    tokens_used INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
