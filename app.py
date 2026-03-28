import os
import traceback

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

# Optional integrations — won't crash if unconfigured
try:
    import boto3
    _s3 = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION", "us-east-1"),
    )
except Exception:
    _s3 = None

try:
    from sqlalchemy import create_engine, text as sa_text
    DATABASE_URL = os.getenv("DATABASE_URL")
    _engine = create_engine(DATABASE_URL) if DATABASE_URL else None
    if _engine:
        with _engine.connect() as conn:
            with open("init.sql") as f:
                conn.execute(sa_text(f.read()))
            conn.commit()
except Exception:
    _engine = None

# App setup
app = FastAPI(title="ObsidianAI Backend", version="1.0.0")

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        )
        return response


app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://obsidianai.org",
        "https://abowden101.github.io",
        "http://localhost:3000",
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# xAI Grok client
_xai = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1",
)

SYSTEM_PROMPT = (
    "You are ObsidianAI's expert assistant — a zero-trust security and xAI Grok "
    "automation specialist serving Orlando businesses and nationwide enterprise clients. "
    "ObsidianAI is an MSP + SaaS hybrid: we provide both hands-on managed security "
    "AND a cloud platform with a client portal. "
    "Service tiers: Foundation ($1,995/mo), Obsidian Core ($2,995-$6,995/mo), Enterprise (custom). "
    "Be concise, precise, and action-oriented. Always encourage scheduling a free "
    "security assessment at team@obsidianai.org."
)


class ChatRequest(BaseModel):
    message: str


class ReportRequest(BaseModel):
    message: str


@app.get("/")
async def root():
    return {
        "status": "ObsidianAI backend online",
        "model": "grok-beta",
        "db": _engine is not None,
        "s3": _s3 is not None,
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "api_key_loaded": bool(os.getenv("XAI_API_KEY")),
        "db_connected": _engine is not None,
        "s3_configured": _s3 is not None,
    }


@app.post("/chat")
@limiter.limit("10/minute")
async def chat(request: Request, req: ChatRequest):
    try:
        response = _xai.chat.completions.create(
            model="grok-beta",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": req.message},
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload-report")
@limiter.limit("5/minute")
async def upload_report(request: Request, req: ReportRequest):
    if not _s3:
        raise HTTPException(status_code=503, detail="S3 not configured")
    chat_req = ChatRequest(message=req.message)
    result = await chat(request, chat_req)
    report_bytes = result["reply"].encode("utf-8")
    bucket = os.getenv("S3_BUCKET")
    key = f"reports/report-{os.urandom(8).hex()}.txt"
    _s3.put_object(Bucket=bucket, Key=key, Body=report_bytes, ServerSideEncryption="AES256")
    url = _s3.generate_presigned_url("get_object", Params={"Bucket": bucket, "Key": key}, ExpiresIn=3600)
    return {"report_url": url, "message": "Report stored in AWS S3"}


@app.get("/clients")
@limiter.limit("20/minute")
async def get_clients(request: Request):
    if not _engine:
        raise HTTPException(status_code=503, detail="Database not configured")
    with _engine.connect() as conn:
        result = conn.execute(sa_text("SELECT * FROM clients"))
        clients = [dict(row._mapping) for row in result]
    return {"clients": clients}
