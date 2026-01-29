import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import sqlite3

app = FastAPI(title="ObsidianAI Backend")

class ReportRequest(BaseModel):
    client_id: int
    data_summary: str

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1"
)

@app.post("/generate-business-report")
async def generate_report(req: ReportRequest):
    conn = sqlite3.connect("clients.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients WHERE id = ?", (req.client_id,))
    data = cursor.fetchone()
    conn.close()

    prompt = f"""You are an expert MSP consultant. Generate a professional report for an Orlando SMB.
Client: {data}
Summary: {req.data_summary}
Focus on: zero-trust recommendations, xAI Grok automation opportunities (hospitality workflows, inventory, reports), cost savings."""

    try:
        response = client.chat.completions.create(
            model="grok-beta",   # or "grok-4-1-fast-reasoning" — check console.x.ai for latest
            messages=[
                {"role": "system", "content": "Expert AI infrastructure consultant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.6,
            max_tokens=1200
        )
        return {"report": response.choices[0].message.content, "used_model": "xAI Grok"}
    except Exception as e:
        raise HTTPException(500, str(e))

# Run with: uvicorn app:app --reload
