"""
ObsidianAI Hospitality Agent
xAI Grok-powered inventory and operations automation for Orlando-area hotels.
"""
import json
import os
from dataclasses import dataclass

from openai import OpenAI

_client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1",
)

AGENT_SYSTEM_PROMPT = """You are ObsidianAI's hospitality operations specialist, 
powered by xAI Grok. You serve Orlando-area hotels, resorts, and theme park 
properties (Disney/Universal adjacent, convention hotels, vacation rentals).

Core capabilities:
- Analyze occupancy, inventory levels, and sales velocity
- Predict stockouts and overstock for amenities (linens, F&B, mini-bar, sundries)
- Generate prioritized reorder recommendations with quantity suggestions
- Optimize for Orlando seasonal demand (holiday peaks, convention season, hurricane prep)
- Flag compliance issues (FDA food safety, local health codes)
- Suggest dynamic pricing or bundling opportunities

Response format — always structure as:
1. Executive Summary (3 bullets max)
2. Key Risks & Opportunities
3. Reorder Recommendations (item, current qty, recommended order qty, reason)
4. Automation Opportunity (one Python/pseudocode snippet)
5. Estimated Monthly Savings
6. Next-Cycle Questions"""


@dataclass
class InventorySnapshot:
    company_name: str
    occupancy_pct: float
    inventory: dict          # {"item_name": current_qty, ...}
    last_7d_sales: dict      # {"item_name": units_sold, ...}
    notes: str = ""


def generate_inventory_plan(snapshot: InventorySnapshot) -> str:
    """
    Generate a full inventory management plan for a hospitality property.

    Args:
        snapshot: Current property state including occupancy and inventory data.

    Returns:
        Structured analysis and recommendations as a string.
    """
    prompt = f"""
Company: {snapshot.company_name}
Current occupancy: {snapshot.occupancy_pct}%
Inventory snapshot: {json.dumps(snapshot.inventory, indent=2)}
Last 7-day sales: {json.dumps(snapshot.last_7d_sales, indent=2)}
Notes: {snapshot.notes or 'None'}

Generate a full operations report following your structured format.
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


# ── FastAPI integration ───────────────────────────────────────────────────────
# In app.py, add:
#
#   from hospitality_agent import generate_inventory_plan, InventorySnapshot
#
#   class InventoryRequest(BaseModel):
#       company_name: str
#       occupancy: float
#       inventory: dict
#       sales: dict
#
#   @app.post("/inventory-plan")
#   @limiter.limit("5/minute")
#   async def inventory_plan(request: Request, req: InventoryRequest):
#       snapshot = InventorySnapshot(
#           company_name=req.company_name,
#           occupancy_pct=req.occupancy,
#           inventory=req.inventory,
#           last_7d_sales=req.sales,
#       )
#       return {"plan": generate_inventory_plan(snapshot)}


# ── CLI demo ──────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    demo = InventorySnapshot(
        company_name="Grand Orlando Resort & Spa",
        occupancy_pct=87.0,
        inventory={
            "bath_towels": 1240,
            "mini_bar_water_500ml": 450,
            "breakfast_pastries": 80,
            "pool_towels": 620,
        },
        last_7d_sales={
            "bath_towels": 980,
            "mini_bar_water_500ml": 390,
            "breakfast_pastries": 210,
            "pool_towels": 540,
        },
        notes="Peak weekend coming up — convention group of 400 checking in Friday.",
    )

    print(f"Generating inventory plan for {demo.company_name}...\n")
    print(generate_inventory_plan(demo))
