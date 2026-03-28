"""
ObsidianAI Hospitality Agent
xAI Grok-powered inventory automation for Orlando hotels and resorts.
"""
import json
import os
from dataclasses import dataclass
from openai import OpenAI

_client = OpenAI(api_key=os.getenv("XAI_API_KEY"), base_url="https://api.x.ai/v1")

AGENT_SYSTEM_PROMPT = """You are ObsidianAI's hospitality operations specialist powered by xAI Grok.
You serve Orlando-area hotels, resorts, and theme park properties.

Response format:
1. Executive Summary (3 bullets)
2. Key Risks & Opportunities
3. Reorder Recommendations (item, current qty, order qty, reason)
4. Automation Opportunity (Python snippet)
5. Estimated Monthly Savings
6. Next-Cycle Questions"""


@dataclass
class InventorySnapshot:
    company_name: str
    occupancy_pct: float
    inventory: dict
    last_7d_sales: dict
    notes: str = ""


def generate_inventory_plan(snapshot: InventorySnapshot) -> str:
    prompt = f"""
Company: {snapshot.company_name}
Occupancy: {snapshot.occupancy_pct}%
Inventory: {json.dumps(snapshot.inventory, indent=2)}
Last 7-day sales: {json.dumps(snapshot.last_7d_sales, indent=2)}
Notes: {snapshot.notes or 'None'}
"""
    response = _client.chat.completions.create(
        model="grok-beta",
        messages=[
            {"role": "system", "content": AGENT_SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=1200,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    demo = InventorySnapshot(
        company_name="Grand Orlando Resort & Spa",
        occupancy_pct=87.0,
        inventory={"bath_towels": 1240, "mini_bar_water_500ml": 450, "breakfast_pastries": 80},
        last_7d_sales={"bath_towels": 980, "mini_bar_water_500ml": 390, "breakfast_pastries": 210},
        notes="Convention group of 400 checking in Friday.",
    )
    print(generate_inventory_plan(demo))
