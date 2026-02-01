# ObsidianAI Security & Privacy Framework

## Data Handling
ObsidianAI acts as an orchestration layer. We do not store client network data. 
- **Encryption:** All data in transit is encrypted via TLS 1.3.
- **Model Privacy:** By utilizing the xAI Enterprise API, all queries are marked as "Stateless." No client data is ingested into the global Grok training set.

## Infrastructure Security
Our platform is designed to be deployed within the client's private VPC (Virtual Private Cloud) or via our secure Render-hosted gateway.

## Compliance Target
Our 2026 roadmap includes achieving **SOC2 Type II** and **ISO 27001** compliance to support global enterprise requirements.
