import os
print("DEBUG: XAI_API_KEY present?", "XAI_API_KEY" in os.environ)
print("DEBUG: All env keys:", list(os.environ.keys()))
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ObsidianAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://abowden101.github.io", "http://localhost:8000", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1"
)

@app.post("/chat")
async def chat(req: ChatRequest):
    print(f"DEBUG: Received /chat request - message: {req.message}")
    try:
        print("DEBUG: Calling xAI API with model 'grok-beta'...")
        response = client.chat.completions.create(
            model="grok-beta",  # ← Safer fallback model (grok-4-latest may not be available)
            messages=[
                {"role": "system", "content": "You are ObsidianAI's expert zero-trust security and xAI Grok automation assistant for Orlando businesses and nationwide clients."},
                {"role": "user", "content": req.message}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        reply = response.choices[0].message.content
        print(f"DEBUG: xAI API success - reply length: {len(reply)}, starts with: {reply[:100]}...")
        return {"reply": reply}
    except Exception as e:
        error_msg = f"ERROR in /chat endpoint: {str(e)}"
        print(error_msg)
        import traceback
        traceback.print_exc()  # Prints full stack trace to logs
        raise HTTPException(status_code=500, detail=error_msg))
