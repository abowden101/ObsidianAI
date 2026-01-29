import os
import json
from openai import OpenAI
from pydantic import BaseModel
from typing import List, Dict

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1"
)

class InventoryItem(BaseModel):
    name: str
    current_stock: int
    min_threshold: int
    daily_usage: float
    supplier: str
    unit_cost: float

class HotelInventoryReport(BaseModel):
    occupancy_rate: float
    items: List[InventoryItem]
    days_until_next_delivery: int

def generate_reorder_plan(report: HotelInventoryReport) -> str:
    items_json = json.dumps([item.dict() for item in report.items], indent=2)
    
    prompt = f"""You are ObsidianAI's xAI Grok Hospitality Automation Agent.
Analyze current inventory for a busy Orlando hotel.

Occupancy: {report.occupancy_rate}%
Days until next delivery: {report.days_until_next_delivery}
Inventory:
{items_json}

Generate a complete reorder plan including:
1. Executive summary (3 bullets)
2. Items that need immediate reorder with exact quantities
3. Projected cost of reorder
4. Suggested reorder schedule for next 30 days
5. One Python-ready automation snippet (using requests + smtplib or print-to-email) that could run daily
6. Estimated monthly savings from automation
7. Risk alerts (e.g., hurricane season impact)

Respond in clear, professional bullet-point format. Prioritize guest satisfaction and cost efficiency."""

    response = client.chat.completions.create(
        model="grok-beta",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
        max_tokens=1400
    )
    return response.choices[0].message.content

# Example usage
if __name__ == "__main__":
    sample_report = HotelInventoryReport(
        occupancy_rate=92,
        days_until_next_delivery=4,
        items=[
            InventoryItem(name="Bath Towels", current_stock=380, min_threshold=500, daily_usage=65, supplier="Orlando Linen Co", unit_cost=8.50),
            InventoryItem(name="Mini-bar Water", current_stock=120, min_threshold=300, daily_usage=45, supplier="Coca-Cola Florida", unit_cost=1.25),
            InventoryItem(name="Breakfast Cereals", current_stock=45, min_threshold=80, daily_usage=12, supplier="Sysco Orlando", unit_cost=3.20)
        ]
    )
    
    plan = generate_reorder_plan(sample_report)
    print(plan)
