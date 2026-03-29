# ObsidianAI marketing site (Next.js 15)

Stack: **Next.js 15** (App Router, static export), **Tailwind CSS**, **shadcn-style** UI primitives, **Framer Motion**.

## Develop

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output is written to `out/`. Use this folder for GitHub Pages or any static host.

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CHAT_API` | FastAPI base URL for `POST /chat` (Grok widget). Default: Render backend. |
| `NEXT_PUBLIC_CALENDLY_URL` | Public Calendly scheduling URL for the demo iframe. |

## Stripe placeholders

Pricing cards link to placeholder Stripe Payment Link URLs. Replace `stripePlaceholder` values in `components/pricing-section.tsx` with live Payment Links or your Checkout Session flow.
