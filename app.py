import os
print("DEBUG: XAI_API_KEY present?", "XAI_API_KEY" in os.environ)
print("DEBUG: All env keys:", list(os.environ.keys()))

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy import create_engine, text
import boto3
import traceback

load_dotenv()

app = FastAPI(title="ObsidianAI Backend")

# Rate Limiting (Security: Prevent abuse)
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Secure Headers Middleware
class SecurityHeadersMiddleware:
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://abowden101.github.io", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# xAI Grok Client
client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1"
)

# AWS S3 Client
s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION", "us-east-1")
)

# AWS RDS PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL) if DATABASE_URL else None

# Initialize DB tables (run once)
if engine:
    with engine.connect() as conn:
        with open("init.sql") as f:
            conn.execute(text(f.read()))
        conn.commit()

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"status": "ObsidianAI Backend running", "model": "grok-beta"}

@app.get("/health")
async def health():
    return {"status": "healthy", "api_key_loaded": "XAI_API_KEY" in os.environ, "db_connected": engine is not None}

@app.post("/chat")
@limiter.limit("10/minute")
async def chat(request: Request, req: ChatRequest):  # ← FIXED: Added request: Request
    print(f"DEBUG: Received /chat request - message: {req.message}")
    try:
        print("DEBUG: Calling xAI API with model 'grok-beta'...")
        response = client.chat.completions.create(
            model="grok-beta",
            messages=[
                {"role": "system", "content": "You are ObsidianAI's expert zero-trust security and xAI Grok automation assistant for Orlando businesses and nationwide clients."},
                {"role": "user", "content": req.message}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        reply = response.choices[0].message.content
        print(f"DEBUG: xAI API success - reply length: {len(reply)}")
        return {"reply": reply}
    except Exception as e:
        error_msg = f"ERROR in /chat endpoint: {str(e)}"
        print(error_msg)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=error_msg)

# Upload report to S3
@app.post("/upload-report")
@limiter.limit("5/minute")
async def upload_report(request: Request, req: ChatRequest):
    report = (await chat(request, req))["reply"]
    report_bytes = report.encode('utf-8')
    bucket = os.getenv("S3_BUCKET")
    key = f"reports/report-{os.urandom(8).hex()}.txt"
    s3.put_object(Bucket=bucket, Key=key, Body=report_bytes, ServerSideEncryption='AES256')
    url = s3.generate_presigned_url('get_object', Params={'Bucket': bucket, 'Key': key}, ExpiresIn=3600)
    return {"report_url": url, "message": "Report securely stored in AWS S3"}

# Get clients from RDS
@app.get("/clients")
@limiter.limit("20/minute")
async def get_clients():
    if not engine:
        raise HTTPException(500, "Database not configured")
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM clients"))
        clients = [dict(row) for row in result]
    return {"clients": clients}
