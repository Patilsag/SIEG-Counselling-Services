import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  // Required: this is how the team actually reaches the student.
  whatsapp: z
    .string()
    .trim()
    .min(1, "WhatsApp number is required")
    .max(40)
    .refine((v) => (v.match(/\d/g) ?? []).length >= 8, "Enter a valid WhatsApp number"),
  stage: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  // Honeypot: humans never see this field; bots fill it.
  company: z.string().trim().max(200).optional().default(""),
});

type Lead = Omit<z.infer<typeof LeadSchema>, "company">;

const GUIDES = [
  { title: "The Germany Blueprint", file: "/guides/01-The-Germany-Blueprint.pdf" },
  { title: "APS, De-confused", file: "/guides/02-APS-De-confused.pdf" },
  { title: "Blocked Account & Visa Pack", file: "/guides/03-Blocked-Account-Visa-Pack.pdf" },
  { title: "Public University Starter List", file: "/guides/04-Public-University-Starter-List.pdf" },
];

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Send one email via Resend. No-ops (returns false) if RESEND_API_KEY isn't set. */
async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.LEAD_EMAIL_FROM ?? "Sieg Counselling Services <info@siegcounselling.com>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) {
    console.error("Resend send failed", res.status, await res.text());
    return false;
  }
  return true;
}

/** Confirmation email sent to the student who booked a call. */
function studentEmailHtml(lead: Lead, siteUrl: string) {
  const firstName = escapeHtml(lead.name.split(" ")[0] || "there");
  const buttons = GUIDES.map(
    (g) => `
      <tr><td style="padding:5px 0">
        <a href="${siteUrl}${g.file}"
           style="display:block;padding:13px 18px;background:#f6f3ec;border:1px solid #e4ddcb;border-radius:10px;color:#16274a;text-decoration:none;font-weight:600;font-size:14px">
          ↓&nbsp;&nbsp;${escapeHtml(g.title)}
        </a>
      </td></tr>`
  ).join("");

  return `
  <div style="margin:0;padding:24px;background:#0f1a2e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
      <div style="background:#16274a;padding:30px 32px">
        <div style="color:#d9bc82;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600">Sieg Counselling Services</div>
        <div style="color:#ffffff;font-size:23px;font-weight:600;margin-top:10px">You're booked in ✓</div>
      </div>
      <div style="padding:28px 32px;color:#3d4a63;font-size:15px;line-height:1.65">
        <p style="margin:0 0 14px">Hi ${firstName},</p>
        <p style="margin:0 0 16px">Thank you for booking your <strong>free call</strong> with Sieg Counselling. We've received your details and we're glad you reached out.</p>
        <div style="background:#f6f7f9;border-left:3px solid #d9bc82;border-radius:0 10px 10px 0;padding:14px 18px;margin:0 0 18px">
          <div style="color:#16274a;font-weight:600;font-size:14px;margin-bottom:4px">What happens next</div>
          <div style="font-size:14px;color:#3d4a63">A member of our team, people who've actually made the India-to-Germany move, will reach out to you personally, usually <strong>within one working day</strong>, on the WhatsApp number or email you shared. There's nothing to prepare. Just bring your questions.</div>
        </div>
        <p style="margin:0 0 14px">While you wait, here are the guides we promised, written from first-hand experience, no fluff:</p>
        <table role="presentation" width="100%" style="border-collapse:collapse">${buttons}</table>
        <p style="margin:18px 0 0">Have a question before we call? Just reply to this email or message us on WhatsApp, a real person will answer.</p>
        <p style="margin:18px 0 0;color:#16274a;font-weight:600">Talk soon,<br>The Sieg Counselling team</p>
      </div>
      <div style="padding:16px 32px;background:#f6f7f9;color:#6b7690;font-size:12px;border-top:1px solid #e6e9ef">
        Guidance from a team already living every step of it · <a href="${siteUrl}" style="color:#6b7690;text-decoration:underline">siegcounselling.com</a>
      </div>
    </div>
  </div>`;
}

/** Internal new-lead alert sent to the team. */
function alertEmailHtml(lead: Lead) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7690;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#16274a;font-size:14px;font-weight:600">${escapeHtml(value)}</td></tr>`
      : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:520px;margin:0 auto;padding:20px">
    <div style="font-size:16px;font-weight:700;color:#16274a;margin-bottom:12px">🔔 New booking: ${escapeHtml(lead.name)}</div>
    <table role="presentation" style="border-collapse:collapse">
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("WhatsApp", lead.whatsapp)}
      ${row("Stage", lead.stage)}
      ${row("Message", lead.message)}
    </table>
    <p style="color:#6b7690;font-size:12px;margin-top:16px">Also saved to your Google Sheet. Reply time matters, book the call fast.</p>
  </div>`;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.company) {
      // Bot caught by honeypot, accept silently, persist nothing.
      return { ok: true, persisted: false as const };
    }

    // company is the honeypot; never persist it.
    const { company: _company, ...lead } = data;

    // 1) Persist to Google Sheet (the source of truth).
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    let persisted = false;
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          submittedAt: new Date().toISOString(),
          token: process.env.LEAD_WEBHOOK_TOKEN ?? "",
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("Sheets webhook failed", res.status, body);
        throw new Error(`Sheets webhook failed: ${res.status}`);
      }
      persisted = true;
    } else {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL not set; lead not persisted", {
        name: lead.name,
        email: lead.email,
      });
    }

    // 2) Fire the emails. Never let an email failure break the booking;
    //    the lead is already saved and the guides are downloadable on-page.
    const siteUrl = process.env.SITE_URL ?? "https://www.siegcounselling.com";
    const notify = process.env.LEAD_NOTIFY_EMAIL ?? "info@siegcounselling.com";
    const results = await Promise.allSettled([
      sendEmail(lead.email, "You're booked in, your free call with Sieg Counselling ✓", studentEmailHtml(lead, siteUrl), notify),
      sendEmail(notify, `New booking: ${lead.name}`, alertEmailHtml(lead), lead.email),
    ]);
    const emailed = results.some((r) => r.status === "fulfilled" && r.value === true);

    return { ok: true, persisted, emailed };
  });
