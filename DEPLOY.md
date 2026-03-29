# Deploy ObsidianAI (Next.js landing)

## Option A — Vercel (recommended)

1. Import the GitHub repo in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `web`.
3. Add environment variables:
   - `NEXT_PUBLIC_CHAT_API` — e.g. `https://obsidianai-evtu.onrender.com`
   - `NEXT_PUBLIC_CALENDLY_URL` — your Calendly event URL
4. Deploy. Attach custom domain `obsidianai.org` in Vercel and point DNS (A/ALIAS/CNAME) per Vercel docs.

## Option B — GitHub Pages (static export)

The app uses `output: "export"` so it can be served as static files.

```powershell
cd web
npm install
npm run build
```

Copy everything from `web/out/` to the branch or folder GitHub Pages serves (often repository root or `docs/`).

Example from repo root after build (PowerShell):

```powershell
Remove-Item -Recurse -Force .\gh-pages-out -ErrorAction SilentlyContinue
Copy-Item -Recurse .\web\out .\gh-pages-out
# Then copy gh-pages-out/* into your gh-pages branch or Pages source directory.
```

Ensure `CNAME` containing `obsidianai.org` is present next to `index.html` (included from `web/public/CNAME`).

## Option C — Cloudflare Pages

Create a project with build command `npm run build` and output directory `web/out`, root directory `web`.

## Backend CORS

`app.py` must allow your production site origin (e.g. `https://obsidianai.org` and preview URLs). Add new origins to `allow_origins` when the frontend domain changes.
