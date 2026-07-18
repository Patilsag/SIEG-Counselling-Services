# Lead capture setup — "Book a free call" → Google Sheet

This connects the website's booking form to your Google Sheet. Every booking
becomes a new row. Free, ~30 minutes, no third-party tools.

## What you'll end up with

A tab called **"Website Leads"** in your Sheet with columns:

| Submitted At | Name | Email | WhatsApp | Stage | Message |
|---|---|---|---|---|---|

---

## Part 1 — Google side (do this first)

1. Open your Google Sheet.
2. Menu: **Extensions → Apps Script**. A code editor opens in a new tab.
3. Delete any code shown, then paste the entire contents of
   [`apps-script-lead-webhook.gs`](./apps-script-lead-webhook.gs).
4. On line 22, replace `CHANGE_ME_to_a_long_random_string` with a long random
   string of your own (e.g. mash 30+ letters/numbers). **Keep this private** —
   you'll reuse it in Part 2. Call it your **secret**.
5. Click **Save** (💾 icon).
6. Run a quick test: in the toolbar function dropdown pick **`testAppend`**, click
   **Run**. Google will ask you to authorize — approve it (it's your own script).
   Check the Sheet: a "Website Leads" tab with one test row should appear.
   Delete that test row afterwards.
7. Click **Deploy → New deployment**.
   - Click the gear ⚙ next to "Select type" → choose **Web app**.
   - **Description:** anything (e.g. "Lead webhook").
   - **Execute as:** *Me*.
   - **Who has access:** *Anyone*.
   - Click **Deploy**, approve if prompted.
8. Copy the **Web app URL** it shows (ends in `/exec`). This is your **webhook URL**.

> If you ever edit the script later, use **Deploy → Manage deployments → Edit →
> Version: New version** so the URL stays the same.

---

## Part 2 — Website side

Give me (or paste into the site's environment) these two values:

```
GOOGLE_SHEETS_WEBHOOK_URL = <the Web app URL from step 8>
LEAD_WEBHOOK_TOKEN        = <the same secret from step 4>
```

**Local development:** copy `.env.example` to `.env` and fill both in.

**Deployed (Lovable / Vercel / Netlify / Cloudflare):** add both as environment
variables in the host's dashboard, then redeploy.

That's it. Submit a test booking on the site — a new row should appear in the
Sheet within a second.

---

## How it stays secure

- The webhook only accepts requests carrying the shared secret, so a leaked URL
  alone can't spam your Sheet.
- The honeypot field on the form is stripped before saving — bots don't reach the Sheet.
- `.env` is git-ignored, so the URL and secret are never committed.

## Later (optional, not needed now)

- **Email the guides automatically** — add Resend to the same server function.
- **WhatsApp delivery** — AiSensy / WhatsApp Cloud API.
- **CRM** — Zoho or HubSpot free tier can import from or sync with this same Sheet.
