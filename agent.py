"""
ObsidianAI Core Agent
Wraps xAI Grok for network security analysis and automation.
"""
import os
import requests


class ObsidianAgent:
    BASE_URL = "https://api.x.ai/v1/chat/completions"

    SYSTEM_PROMPT = (
        "You are ObsidianAI — a specialized cybersecurity and network engineering expert. "
        "Analyze network logs, identify vulnerabilities, and suggest infrastructure optimizations. "
        "Always flag findings: [CRITICAL], [HIGH], [MEDIUM], [INFO]."
    )

    def __init__(self, api_key: str | None = None, model: str = "grok-beta"):
        self.api_key = api_key or os.getenv("XAI_API_KEY")
        if not self.api_key:
            raise ValueError("XAI_API_KEY not set")
        self.model = model
        self._headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}",
        }

    def _complete(self, messages: list[dict], temperature: float = 0.2) -> str:
        payload = {"model": self.model, "messages": messages, "temperature": temperature}
        resp = requests.post(self.BASE_URL, headers=self._headers, json=payload, timeout=30)
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]

    def analyze_threat(self, log_data: str) -> str:
        return self._complete([
            {"role": "system", "content": self.SYSTEM_PROMPT},
            {"role": "user", "content": f"Analyze this log for threats and lateral movement:\n\n{log_data}"},
        ])

    def generate_firewall_rule(self, natural_language: str, platform: str = "palo-alto") -> str:
        return self._complete([
            {"role": "system", "content": self.SYSTEM_PROMPT},
            {"role": "user", "content": f"Convert to {platform} firewall rule (config block only):\n\n{natural_language}"},
        ])

    def audit_config(self, config_text: str, device_type: str = "cisco") -> str:
        return self._complete([
            {"role": "system", "content": self.SYSTEM_PROMPT},
            {"role": "user", "content": f"Audit this {device_type} config for vulnerabilities and zero-trust gaps:\n\n{config_text}"},
        ])

    def semantic_network_query(self, topology_json: str, question: str) -> str:
        return self._complete([
            {"role": "system", "content": self.SYSTEM_PROMPT},
            {"role": "user", "content": f"Topology:\n{topology_json}\n\nQuestion: {question}"},
        ], temperature=0.4)


if __name__ == "__main__":
    agent = ObsidianAgent()
    sample = "Src: 192.168.1.50 -> Dst: 10.0.0.1 | SSH | 47 failed auth attempts in 60s | User: root"
    print("=== Threat Analysis ===")
    print(agent.analyze_threat(sample))
