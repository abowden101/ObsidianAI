# obsidian_agent.py
import os
import requests

class ObsidianAgent:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.x.ai/v1/chat/completions"
        self.system_prompt = (
            "You are ObsidianAI, a specialized Cybersecurity and Networking Expert. "
            "Your goal is to analyze network logs, identify vulnerabilities, and "
            "suggest infrastructure optimizations using xAI's real-time data."
        )

    def analyze_network_threat(self, log_data):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        payload = {
            "model": "grok-2-latest", # Or grok-3 if available
            "messages": [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": f"Analyze this log for lateral movement: {log_data}"}
            ],
            "temperature": 0.2 # Lower temperature for high-accuracy security analysis
        }

        response = requests.post(self.base_url, headers=headers, json=payload)
        return response.json()['choices'][0]['message']['content']

# Enterprise Example Usage
# agent = ObsidianAgent(api_key="YOUR_XAI_KEY")
# print(agent.analyze_network_threat("Src: 192.168.1.50 -> Dst: 10.0.0.1 (Multiple failed SSH attempts)"))
