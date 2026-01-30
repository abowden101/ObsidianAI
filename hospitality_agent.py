# hospitality_agent.py
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("XAI_API_KEY"), base_url="https://api.x.ai/v1")

def generate_hotel_inventory_plan(occupancy: float, items_data: dict):
    prompt = f"Generate reorder plan for Orlando hotel. Occupancy: {occupancy}%. Items: {items_data}"
    response = client.chat.completions.create(
        model="grok-4-latest",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800
    )
    return response.choices[0].message.content
