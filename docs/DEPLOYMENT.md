# Deployment guide — siegcounselling.com

## Environment variables (REQUIRED — set all 6 in the host dashboard before first visitor)

The local `.env` file does NOT deploy. Copy each value into your host's environment settings
(Lovable / Vercel / Netlify / Cloudflare → project → Environment Variables), then redeploy.

| Variable | What breaks without it | Used in |
|---|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | Leads are accepted but **not saved anywhere** (100% lead loss) | `src/lib/lead.functions.ts` |
| `LEAD_WEBHOOK_TOKEN` | Sheet webhook rejects every submission (`unauthorized`) | `src/lib/lead.functions.ts` + Apps Script line 22 (must match exactly) |
| `RESEND_API_KEY` | No emails send — student gets no confirmation, you get no alert (site still works; email silently skipped) | `src/lib/lead.functions.ts` |
| `LEAD_EMAIL_FROM` | Falls back to `Sieg Counselling Services <info@siegcounselling.com>` — keep set anyway | `src/lib/lead.functions.ts` |
| `LEAD_NOTIFY_EMAIL` | New-lead alerts fall back to `info@siegcounselling.com` | `src/lib/lead.functions.ts` |
| `SITE_URL` | Guide links inside emails point to wrong domain | `src/lib/lead.functions.ts` |

Current production values: see local `.env` on the owner's machine (never commit it).

## Post-deploy smoke test (5 min, do every deploy)

1. Open the live site → hero video plays, poster shows instantly.
2. Submit one real booking with your own details.
3. Confirm: row appears in Google Sheet "Website Leads" tab.
4. Confirm: confirmation email arrives (check spam first time).
5. Confirm: "New booking" alert arrives at `LEAD_NOTIFY_EMAIL`.
6. Download one guide PDF.
7. Delete your test row from the Sheet.

## Related docs

- `docs/LEAD-SETUP.md` — Google Sheets webhook setup (Apps Script)
- `docs/apps-script-lead-webhook.gs` — the webhook script
- `docs/ANALYTICS.md` — Plausible events

## Domain

Canonical + OG + schema all point to `https://www.siegcounselling.com`. Deploy behind that exact
domain (www). If the final domain differs, update: `src/routes/__root.tsx` (canonical, og:url,
og:image, JSON-LD), `public/robots.txt`, `public/sitemap.xml`, `SITE_URL` env var.

## Host-level extras (10 min, once)

- HTTPS: automatic on Lovable/Vercel/Netlify/Cloudflare.
- Add security headers in host dashboard: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`.
