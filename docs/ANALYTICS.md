# Analytics — Google Analytics 4

Measurement ID: `G-GSQ3H9E9YP`. Loaded sitewide in `src/routes/__root.tsx`
(gtag.js + config). `page_view` fires automatically on every page, including
the six guide pages.

## Custom events (fired from `src/routes/index.tsx` via `track()`)

| Event | Fires when | Params |
|---|---|---|
| `book_now` | Book Now clicked (submit attempt) | — |
| `consultation_submit` | Booking succeeded (lead saved to Sheet) | — |
| `guide_download` | Any guide PDF link clicked (guides grid + success panel) | `guide`: title |
| `whatsapp_click` | Any WhatsApp link (hero rail, footer, final CTA) | — |

## GA4 setup (one-time, in analytics.google.com)

1. Admin → Events: wait for events to appear after first real traffic (24–48 h lag is normal).
2. Admin → Events → mark `consultation_submit` and `book_now` as **key events** (conversions).
3. Reports → Realtime: verify events immediately after deploy by clicking around the live site.

## Funnel to watch

`page_view` → `guide_download` / `whatsapp_click` (interest) → `book_now` (intent)
→ `consultation_submit` (converted). Gap between `book_now` and `consultation_submit`
= server/webhook trouble; check host logs.

## Privacy note

GA4 sets cookies. For EU visitors GDPR expects a consent banner; primary audience is
India, where this is currently tolerated practice. If EU traffic grows or you want
strict compliance, add a consent banner with Google Consent Mode, or switch to a
cookieless tool later. Privacy policy should mention Google Analytics — one line to add.
