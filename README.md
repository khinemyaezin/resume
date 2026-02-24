# Markdown Renderer

Webpack + TypeScript starter that fetches a Markdown file, converts it with `marked`, sanitizes via `DOMPurify`, and styles everything with a bold dark UI. This repository is the Render step before wiring viewer counting.

## Setup

1. Install dependencies once network access is available:
   ```
   npm install
   ```
2. During development run:
   ```
   npm start
   ```
   The dev server serves `content/resume.md` at `/content/resume.md` and reloads on change.
3. Build for production:
   ```
   npm run build
   ```
   This also copies `content/` into `dist/content/` so markdown fetch paths keep working in preview/production.
4. Preview the generated `dist/` folder with your tool of choice (the `preview` script assumes `serve` is installed globally).

## Workflow Notes

- Markdown lives under `content/`. Any `.md` files placed there become accessible at `/content/<name>.md` once you restart the dev server.
- We sanitize every render to prevent unsafe HTML or scripts; the sanitization runs purely in the browser.
- Syntax highlighting is powered by `highlight.js` and the `github-dark` theme, so code blocks stand out.

## What's Next

1. Once rendering is stable, add viewer counting by calling a secure API (e.g., a Supabase Edge Function or a Cloudflare Worker) from the browser after the markdown loads.
2. Protect that API with Supabase RLS, an RPC-only write path, and rate limiting to stop unwanted access.
3. Store viewer stats in a Postgres table and avoid leaking service role keys client-side.
