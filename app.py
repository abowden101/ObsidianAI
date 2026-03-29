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
import stripe as stripe_lib
import httpx

stripe_lib.api_key = os.getenv("STRIPE_SECRET_KEY", "")

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


# Frontend origins: production domains + optional extra (comma-separated, e.g. staging URLs).
# All *.vercel.app preview/production URLs are allowed via regex so Grok works after deploy
# without redeploying the API for each new Vercel hostname.
_cors_extra = [
    o.strip()
    for o in os.getenv("CORS_ALLOW_ORIGINS", "").split(",")
    if o.strip()
]
_cors_origins = [
    "https://obsidianai.org",
    "https://www.obsidianai.org",
    "https://abowden101.github.io",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
] + _cors_extra

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
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


class AuditPaymentRequest(BaseModel):
    email: str
    audit_data: dict


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


@app.post("/create-payment-intent")
@limiter.limit("10/minute")
async def create_payment_intent(request: Request, req: AuditPaymentRequest):
    try:
        intent = stripe_lib.PaymentIntent.create(
            amount=9700,
            currency="usd",
            receipt_email=req.email,
            metadata={
                "product": "instant_audit",
                "company": req.audit_data.get("company", ""),
                "industry": req.audit_data.get("industry", ""),
                "size": req.audit_data.get("size", ""),
            },
        )
        return {"client_secret": intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/stripe-webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    try:
        event = stripe_lib.Webhook.construct_event(payload, sig, webhook_secret)
    except (ValueError, stripe_lib.error.SignatureVerificationError):
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    if event["type"] == "payment_intent.succeeded":
        pi = event["data"]["object"]
        email = pi.get("receipt_email", "")
        company = pi["metadata"].get("company", "a business")
        industry = pi["metadata"].get("industry", "general business")
        size = pi["metadata"].get("size", "unknown size")

        # Generate report via Grok
        try:
            report_response = _xai.chat.completions.create(
                model="grok-beta",
                max_tokens=2000,
                messages=[{
                    "role": "user",
                    "content": (
                        f"Generate a professional cybersecurity audit report for {company}, "
                        f"a {industry} company with {size} employees.\n\n"
                        "Structure the report exactly as follows:\n"
                        "1. EXECUTIVE RISK SUMMARY (3 bullet points)\n"
                        "2. TOP 5 SECURITY VULNERABILITIES (each with severity: CRITICAL/HIGH/MEDIUM)\n"
                        "3. ZERO-TRUST GAP ANALYSIS (what's missing from their architecture)\n"
                        "4. COMPLIANCE RISK SCORES (rate HIPAA, PCI-DSS, SOC2 each 1-10 with explanation)\n"
                        "5. PRIORITY REMEDIATION ROADMAP\n"
                        "   - 30 Days: Quick wins\n"
                        "   - 60 Days: Medium-term fixes\n"
                        "   - 90 Days: Strategic improvements\n"
                        "6. ESTIMATED ANNUAL BREACH COST EXPOSURE (dollar figure based on industry averages)\n\n"
                        "Write for a non-technical business owner. Be specific and actionable."
                    )
                }],
            )
            report_content = report_response.choices[0].message.content
        except Exception as e:
            report_content = f"Report generation encountered an issue. Please contact team@obsidianai.org. Error: {str(e)}"

        # Send via Resend
        resend_key = os.getenv("RESEND_API_KEY", "")
        if resend_key and email:
            try:
                async with httpx.AsyncClient() as client:
                    await client.post(
                        "https://api.resend.com/emails",
                        headers={
                            "Authorization": f"Bearer {resend_key}",
                            "Content-Type": "application/json",
                        },
                        json={
                            "from": "ObsidianAI Reports <reports@obsidianai.org>",
                            "to": [email],
                            "subject": f"Your ObsidianAI Security Audit — {company}",
                            "html": f"""
                               <div style="font-family:monospace;max-width:700px;margin:auto;background:#000;color:#fff;padding:40px;">
                               <h1 style="color:#fff;font-size:24px;margin-bottom:8px;">ObsidianAI</h1>
                               <p style="color:#777;font-size:14px;margin-bottom:32px;">Instant AI Security Audit</p>
                               <pre style="white-space:pre-wrap;font-size:14px;line-height:1.7;color:#e5e5e5;">{report_content}</pre>
                               <hr style="border-color:#222;margin:32px 0;">
                               <p style="color:#555;font-size:12px;">Questions? Reply to this email or contact <a href="mailto:team@obsidianai.org" style="color:#4ade80;">team@obsidianai.org</a></p>
                               <p style="color:#555;font-size:12px;">ObsidianAI · Orlando, Florida · obsidianai.org</p>
                               </div>
                               """,
                        },
                    )
            except Exception as e:
                print(f"Email send error: {e}")

        print(f"✓ Audit completed and sent to {email} for {company}")

    return {"status": "ok"}


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
