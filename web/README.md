# ObsidianAI marketing site (Next.js 15)

Stack: **Next.js 15** (App Router, static export), **Tailwind CSS**, **shadcn-style** UI primitives, **Framer Motion**.

UI: interactive **perspective grid** + parallax orbs, **pointer-tilt** on hero / Grok / pricing / trust cards, animated **neural wire** SVGs, glass panels, **xAI Grok** attribution chip (text-only; links to x.ai). Respects **`prefers-reduced-motion`**.

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
| `NEXT_PUBLIC_CHAT_API` | FastAPI base URL for `POST /chat` (Grok widget). |
| `NEXT_PUBLIC_CALENDLY_URL` | Public Calendly page URL (embed params added in code). |
| `NEXT_PUBLIC_STRIPE_CHECKOUT_FOUNDATION` | Stripe Payment Link / checkout URL for Foundation. |
| `NEXT_PUBLIC_STRIPE_CHECKOUT_CORE` | Stripe URL for Core tier. |
| `NEXT_PUBLIC_STRIPE_CHECKOUT_ENTERPRISE` | Optional; defaults to `mailto:` in `lib/public-config.ts` if unset. |

Empty Stripe env vars fall back to **email** (`team@obsidianai.org`).
