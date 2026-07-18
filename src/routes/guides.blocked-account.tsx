import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideSchema, type GuideData } from "@/components/GuideLayout";

const g: GuideData = {
  slug: "blocked-account",
  h1: "Blocked Account (Sperrkonto) for Germany: Amount, Providers & Process 2026",
  kicker: "Finances · Visa requirement",
  updated: "July 2026",
  directAnswer:
    "For 2026, Indian students need a blocked account of €11,904 for one year (€992 per month) to get a German student visa. You deposit the money before your visa appointment, and after arriving in Germany you receive €992 back every month for living costs. It is proof of funds, not a fee, the money stays yours.",
  definition: {
    term: "Blocked account (Sperrkonto)",
    text: "a special German bank account that proves to the embassy you can finance your first year. The balance is 'blocked': you cannot withdraw it freely, it is released to you in fixed monthly instalments after you arrive in Germany.",
  },
  facts: [
    { label: "Required amount 2026", value: "€11,904 / year (€992 / month)" },
    { label: "Setup time", value: "2–7 working days" },
    { label: "Popular providers", value: "Expatrio, Fintiba, Coracle" },
    { label: "Money returned?", value: "Yes, €992/month after arrival" },
  ],
  steps: [
    { title: "Choose a provider", body: "Expatrio, Fintiba, and Coracle are the standard embassy-accepted options for Indian students. Compare setup fee, monthly fee, and whether health insurance is bundled." },
    { title: "Open the account online", body: "Passport + admission letter (or application proof), 15-minute form. Account details usually arrive within a week." },
    { title: "Transfer €11,904 + buffer", body: "Wire the amount plus the provider's setup fee from India. Use your own or a parent's account; keep the transfer receipt for the visa file." },
    { title: "Receive the blocking confirmation", body: "The provider issues a Sperrbestätigung (blocking confirmation), this exact PDF goes into your visa application." },
    { title: "Activate after arrival", body: "In Germany, open a regular current account, complete the provider's activation, and €992 lands in it monthly for 12 months." },
  ],
  costs: [
    { item: "Blocked amount", amount: "€11,904", note: "Your money, returned monthly" },
    { item: "Provider setup fee", amount: "€49–110", note: "One-time, varies by provider" },
    { item: "Monthly provider fee", amount: "€0–5", note: "Some bundle insurance instead" },
    { item: "Bank transfer charges", amount: "₹500–2,000", note: "Indian bank wire fees + forex margin" },
  ],
  eligibility: [
    "Required for nearly all Indian student-visa applicants (non-EU nationals)",
    "Alternatives accepted by embassies: a formal sponsor declaration (Verpflichtungserklärung) from a German resident, or a full scholarship covering €992/month",
    "Partial scholarships reduce the blocked amount proportionally",
  ],
  mistakes: [
    { title: "Transferring the exact amount with no buffer", body: "Bank charges get deducted mid-transfer and you land €30 short, visa file rejected. Send €100–150 extra; providers refund surpluses." },
    { title: "Opening the account too late", body: "Transfers from India can take a week and the blocking confirmation another few days. Do this at least 4 weeks before your visa appointment." },
    { title: "Confusing blocked account with tuition", body: "It's living-cost proof, not a payment. Public universities charge almost no tuition, the €11,904 comes back to you monthly." },
    { title: "Picking a provider the embassy doesn't list", body: "Stick to embassy-recognised providers. An unrecognised bank means a rejected financial proof." },
  ],
  faqs: [
    { q: "How much is the blocked account for Germany in 2026?", a: "€11,904 for one year, €992 per month. This rate has applied since September 2024 and remains current for 2026 applications." },
    { q: "Do I get the blocked account money back?", a: "Yes. After arriving in Germany you receive €992 every month into your regular German bank account. It's your own money, released in instalments." },
    { q: "Which blocked account provider is best?", a: "Expatrio, Fintiba, and Coracle are all embassy-accepted. Differences are fees and insurance bundles, we help students pick based on their city and insurance plan." },
    { q: "Can my parents' bank statement replace a blocked account?", a: "For Indian applicants, generally no. The German embassy in India expects a blocked account, a formal sponsor declaration from a German resident, or a recognised scholarship." },
    { q: "What happens to the account if my visa is rejected?", a: "You request de-blocking with the rejection letter and the full amount is transferred back, minus provider fees. Takes 2–6 weeks." },
  ],
  related: [
    { title: "Student Visa Guide", href: "/guides/student-visa" },
    { title: "Application Timeline", href: "/guides/application-timeline" },
    { title: "APS Certificate Guide", href: "/guides/aps-certificate" },
    { title: "Work Student Guide", href: "/guides/work-student" },
  ],
};

export const Route = createFileRoute("/guides/blocked-account")({
  head: () => ({
    meta: [
      { title: "Blocked Account Germany 2026: €11,904 Amount, Providers, Process | Sieg Counselling" },
      { name: "description", content: "Germany blocked account 2026: exact amount (€11,904/year, €992/month), Expatrio vs Fintiba vs Coracle, step-by-step setup from India, and costly mistakes to avoid." },
    ],
    links: [{ rel: "canonical", href: "https://www.siegcounselling.com/guides/blocked-account" }],
    scripts: guideSchema(g).map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
  component: () => <GuidePage g={g} />,
});
