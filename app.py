import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ObsidianAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://abowden101.github.io", "*"],  # Tighten to your domain in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),  # Your NEW key goes in Render env vars, NOT here
    base_url="https://api.x.ai/v1"
)

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="grok-4-latest",
            messages=[
                {"role": "system", "content": "You are ObsidianAI's expert cybersecurity and automation assistant."},
                {"role": "user", "content": req.message}
            ],
            temperature=0.7,
            max_tokens=900
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(500, detail=str(e))

# Test endpoint
@app.get("/")
def root():
    return {"message": "ObsidianAI Backend Running"}
