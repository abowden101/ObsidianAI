(function () {
    'use strict';

    /* ── Scroll fade-in ── */
    const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        }),
        { threshold: 0.07, rootMargin: '0px 0px -28px 0px' }
    );
    document.querySelectorAll('.fade-in').forEach((el) => io.observe(el));

    /* ── Smooth scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
        });
    });

    /* ── AJAX Contact Form ── */
    const contactForm = document.getElementById('contactForm');
    const formToast   = document.getElementById('formToast');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn  = contactForm.querySelector('[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Sending\u2026';
            btn.disabled = true;
            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' },
                });
                if (res.ok) {
                    contactForm.reset();
                    toast('Assessment request received. We\'ll be in touch within 24h.', 'success');
                } else {
                    toast('Something went wrong. Email us: team@obsidianai.org', 'error');
                }
            } catch {
                toast('Network error. Email us at team@obsidianai.org', 'error');
            } finally {
                btn.textContent = orig;
                btn.disabled = false;
            }
        });
    }

    function toast(message, type) {
        if (!formToast) return;
        formToast.textContent = message;
        formToast.className = 'form-toast ' + type;
        setTimeout(() => { formToast.className = 'form-toast'; }, 7000);
    }

    /* ══════════════════════════════════════════════════
       INSTANT AUDIT — $97 PAID PRODUCT
       
       HOW TO ACTIVATE:
       1. Create a Stripe account at stripe.com
       2. Get your Publishable Key from Stripe Dashboard → Developers → API Keys
       3. Replace 'pk_live_YOUR_STRIPE_PUBLISHABLE_KEY' below with your real key
       4. Create a product in Stripe: $97 one-time, name "Instant AI Security Audit"
       5. Add the /create-payment-intent endpoint to your FastAPI backend (app.py)
          — see the comment block at the bottom of this file
       6. When payment succeeds, your backend calls Grok and emails the report
    ══════════════════════════════════════════════════ */

    const STRIPE_PK  = 'pk_live_YOUR_STRIPE_PUBLISHABLE_KEY'; // ← replace this
    const BACKEND    = 'https://obsidianai-evtu.onrender.com';

    const step1      = document.getElementById('auditStep1');
    const step2      = document.getElementById('auditStep2');
    const step3      = document.getElementById('auditStep3');
    const inputForm  = document.getElementById('auditInputForm');
    const backBtn    = document.getElementById('auditBack');
    const payBtn     = document.getElementById('auditPayBtn');
    const payError   = document.getElementById('auditPayError');
    const summary    = document.getElementById('auditSummary');
    const emailInput = document.getElementById('a-email');

    let stripe, cardElement, auditData = {};

    // Init Stripe only when audit section is visible
    if (step1 && typeof Stripe !== 'undefined') {
        stripe = Stripe(STRIPE_PK);
        const elements = stripe.elements({
            appearance: {
                theme: 'night',
                variables: {
                    colorBackground: 'rgba(255,255,255,0.04)',
                    colorText: '#ffffff',
                    colorTextPlaceholder: '#444444',
                    fontFamily: '"DM Mono", monospace',
                    borderRadius: '2px',
                    colorPrimary: '#ffffff',
                },
            },
        });
        cardElement = elements.create('card');
        cardElement.mount('#stripeCardElement');
    }

    // Step 1 → Step 2: collect audit data, show payment
    if (inputForm) {
        inputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fd = new FormData(inputForm);
            auditData = {
                company:  fd.get('company') || '',
                industry: fd.get('industry') || '',
                size:     fd.get('size') || '',
                stack:    fd.get('stack') || '',
                concerns: fd.get('concerns') || '',
            };

            // Populate summary
            if (summary) {
                summary.textContent =
                    `${auditData.company} \u00B7 ${auditData.industry} \u00B7 ${auditData.size} employees`;
            }

            step1.style.display = 'none';
            step2.style.display = 'block';
            if (emailInput) emailInput.focus();
        });
    }

    // Back button
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            step2.style.display = 'none';
            step1.style.display = 'block';
        });
    }

    // Step 2 → Step 3: payment
    if (payBtn) {
        payBtn.addEventListener('click', async () => {
            const email = emailInput ? emailInput.value.trim() : '';
            if (!email || !email.includes('@')) {
                payError.textContent = 'Please enter a valid email address.';
                return;
            }

            payBtn.textContent = 'Processing\u2026';
            payBtn.disabled = true;
            payError.textContent = '';

            try {
                // 1. Create payment intent on your backend
                const intentRes = await fetch(`${BACKEND}/create-payment-intent`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, audit_data: auditData }),
                });

                if (!intentRes.ok) throw new Error('Payment setup failed. Try again.');

                const { client_secret } = await intentRes.json();

                // 2. Confirm card payment with Stripe
                const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: { email },
                    },
                });

                if (error) {
                    payError.textContent = error.message;
                    payBtn.textContent = 'Pay $97 \u2014 Get My Report';
                    payBtn.disabled = false;
                    return;
                }

                if (paymentIntent.status === 'succeeded') {
                    step2.style.display = 'none';
                    step3.style.display = 'block';
                    // Track conversion in GA
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'purchase', { value: 97, currency: 'USD', transaction_id: paymentIntent.id });
                    }
                }
            } catch (err) {
                payError.textContent = err.message || 'Something went wrong. Email team@obsidianai.org';
                payBtn.textContent = 'Pay $97 \u2014 Get My Report';
                payBtn.disabled = false;
            }
        });
    }

    /* ── Chat Widget ── */
    const fab       = document.getElementById('chatFab');
    const panel     = document.getElementById('chatPanel');
    const closeBtn  = document.getElementById('chatClose');
    const msgList   = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatIn');
    const chatSend  = document.getElementById('chatSend');

    if (!fab || !panel) return;

    const openPanel  = () => { panel.classList.add('open'); chatInput.focus(); };
    const closePanel = () => panel.classList.remove('open');

    fab.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);

    document.addEventListener('click', (e) => {
        if (panel.classList.contains('open') &&
            !panel.contains(e.target) && !fab.contains(e.target)) closePanel();
    });

    function appendMsg(text, isUser) {
        const d = document.createElement('div');
        d.className = 'msg ' + (isUser ? 'user' : 'bot');
        d.textContent = text;
        msgList.appendChild(d);
        msgList.scrollTop = msgList.scrollHeight;
    }

    function showTyping() {
        const d = document.createElement('div');
        d.className = 'typing'; d.id = 'chatTyping';
        d.innerHTML = '<span></span><span></span><span></span>';
        msgList.appendChild(d);
        msgList.scrollTop = msgList.scrollHeight;
    }

    function removeTyping() { document.getElementById('chatTyping')?.remove(); }

    async function sendMsg(text) {
        const msg = text.trim();
        if (!msg) return;
        appendMsg(msg, true);
        showTyping();
        chatInput.value = '';
        chatSend.disabled = true;
        try {
            const res = await fetch(`${BACKEND}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg }),
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            removeTyping();
            appendMsg(data.reply || 'Processing\u2026', false);
        } catch {
            removeTyping();
            appendMsg('Backend is starting up \u2014 please try again in 30 seconds.', false);
        } finally {
            chatSend.disabled = false;
        }
    }

    chatSend.addEventListener('click', () => sendMsg(chatInput.value));
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) sendMsg(chatInput.value);
    });

    window.quickSend = (q) => { openPanel(); sendMsg(q); };

})();

/*
═══════════════════════════════════════════════════════
  BACKEND ADDITION REQUIRED — add this to app.py
  to activate the $97 Instant Audit payment flow:
═══════════════════════════════════════════════════════

import stripe as stripe_lib
stripe_lib.api_key = os.getenv("STRIPE_SECRET_KEY")

class AuditPaymentRequest(BaseModel):
    email: str
    audit_data: dict

@app.post("/create-payment-intent")
@limiter.limit("10/minute")
async def create_payment_intent(request: Request, req: AuditPaymentRequest):
    try:
        intent = stripe_lib.PaymentIntent.create(
            amount=9700,          # $97.00 in cents
            currency="usd",
            receipt_email=req.email,
            metadata={
                "product": "instant_audit",
                "company": req.audit_data.get("company", ""),
                "industry": req.audit_data.get("industry", ""),
            },
        )
        return {"client_secret": intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Stripe webhook — fires after payment succeeds, generates + emails audit report
@app.post("/stripe-webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig     = request.headers.get("stripe-signature")
    secret  = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe_lib.Webhook.construct_event(payload, sig, secret)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook")

    if event["type"] == "payment_intent.succeeded":
        pi = event["data"]["object"]
        email    = pi.get("receipt_email")
        company  = pi["metadata"].get("company", "")
        industry = pi["metadata"].get("industry", "")

        # Generate audit report via Grok
        report = _xai.chat.completions.create(
            model="grok-beta",
            messages=[{
                "role": "user",
                "content": (
                    f"Generate a detailed security audit report for {company}, "
                    f"a {industry} business. Include: Executive Risk Summary, "
                    f"Top 5 Vulnerabilities, Zero-Trust Gap Analysis, "
                    f"Compliance Risk Score (HIPAA/PCI/SOC2), "
                    f"Priority Remediation Roadmap (30/60/90 day), "
                    f"Estimated Breach Cost Exposure. "
                    f"Format professionally for a business owner."
                )
            }],
            max_tokens=2000,
        ).choices[0].message.content

        # Email report (add SendGrid/Resend integration here)
        # For now, log it — connect email service next
        print(f"AUDIT REPORT for {email}:\n{report}")

    return {"status": "ok"}

# Add to requirements.txt:  stripe==7.0.0

# Add to .env.example:
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...
*/
