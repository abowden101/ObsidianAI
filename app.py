import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ObsidianAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    client_id: int = None  # optional for context

class ReportRequest(BaseModel):
    client_id: int
    data_summary: str

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1"
)

@app.post("/chat")
async def chat_with_grok(req: ChatRequest):
    system_prompt = """You are ObsidianAI Assistant — an expert in secure AI infrastructure, xAI Grok automation, Palo Alto zero-trust, and Orlando hospitality IT.
Be helpful, concise, and always tie answers back to business value or security."""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": req.message}
    ]

    try:
        response = client.chat.completions.create(
            model="grok-beta",
            messages=messages,
            temperature=0.7,
            max_tokens=800
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(500, str(e))
from dotenv import load_dotenv
load_dotenv()  # loads from .env

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),        # ← Secure
    base_url="https://api.x.ai/v1"
)
# Keep your existing /generate-business-report endpoint here...
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime

scheduler = BackgroundScheduler()
scheduler.start()

def daily_inventory_report():
    # Example: call Grok for hotel client #1
    print(f"[{datetime.now()}] Running daily hotel inventory report...")
    # Add your generate_reorder_plan logic here or call /chat internally

scheduler.add_job(daily_inventory_report, 'cron', hour=6, minute=0)  # 6:00 AM daily
