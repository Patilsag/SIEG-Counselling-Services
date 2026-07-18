import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideSchema, type GuideData } from "@/components/GuideLayout";

const g: GuideData = {
  slug: "application-timeline",
  h1: "Germany Application Timeline: The 12-Month Plan for Winter Intake",
  kicker: "Planning · Month by month",
  updated: "July 2026",
  directAnswer:
    "Plan 8–12 months from decision to departure for a German Master's. For winter intake (October start), the critical deadline is July 15 via uni-assist, which means APS by spring, applications by early June, and visa appointment booked in June–July. Students who start the previous autumn cruise; students who start in May scramble.",
  definition: {
    term: "Winter vs summer intake",
    text: "German universities admit twice a year. Winter semester (October) is the main intake with the full course catalogue, application window roughly December–July 15. Summer semester (April) offers fewer programs, window roughly September–January 15.",
  },
  facts: [
    { label: "Total runway", value: "8–12 months comfortable" },
    { label: "Winter deadline", value: "~July 15 (uni-assist)" },
    { label: "Summer deadline", value: "~January 15" },
    { label: "Longest waits", value: "APS 4–8 wks · admissions 4–8 wks · visa 4–12 wks" },
  ],
  steps: [
    { title: "Months 1–2 (Sep–Oct): Decide and shortlist", body: "Profile evaluation, course research on DAAD and university sites, shortlist of 6–10 programs, public universities first. Start IELTS prep if needed." },
    { title: "Month 3 (Nov): APS application", body: "Apply for APS now, it's the longest fixed pipe you can't compress. Collect and attest all academic documents in the same pass." },
    { title: "Months 4–5 (Dec–Jan): Tests + SOP", body: "Sit IELTS/TOEFL. Draft SOP and arrange two LORs. Tailor the SOP per program family, one honest story, adjusted per course." },
    { title: "Months 6–7 (Feb–Apr): Applications", body: "Uni-assist and direct portals open through this window. Submit 6+ weeks before each deadline; verify per-university requirements (VPD vs full application)." },
    { title: "Month 8 (May–Jun): Offers + blocked account", body: "Admissions land April–June. Accept, then immediately open the blocked account and transfer €11,904 + buffer, and book the visa appointment the same week." },
    { title: "Months 9–10 (Jun–Aug): Visa + housing", body: "Attend the appointment with the full file. While waiting, hunt accommodation (WG-Gesucht, studierendenwerk dorms, beware deposit scams) and book insurance." },
    { title: "Months 11–12 (Sep–Oct): Fly and settle", body: "Fly 2–3 weeks before semester start. First fortnight: Anmeldung, bank account, insurance activation, enrolment (Immatrikulation), residence permit appointment." },
  ],
  costs: [
    { item: "IELTS/TOEFL", amount: "₹17,000–20,000", note: "Book 2 months ahead" },
    { item: "APS", amount: "₹18,000", note: "Month 3" },
    { item: "Uni-assist", amount: "€75 + €30 each", note: "Months 6–7" },
    { item: "Blocked account", amount: "€11,904 + fees", note: "Month 8, largest single transfer" },
    { item: "Visa fee", amount: "€75", note: "Month 9" },
    { item: "Flight + first month", amount: "₹60,000–1,00,000", note: "Deposit, transit, setup" },
  ],
  eligibility: [
    "This plan fits Master's applicants targeting winter (October) intake, the main cycle",
    "Summer (April) intake: shift everything ~6 months; check your courses even exist in summer",
    "Final-year bachelor students: run the same plan; APS accepts final-year applicants with 6-semester transcripts",
  ],
  mistakes: [
    { title: "Starting in May for October", body: "APS alone eats 4–8 weeks. A May start means missed deadlines or panic applications to whatever's still open, the opposite of choosing well." },
    { title: "Serialising everything", body: "APS, IELTS, and SOP can run in parallel. Students who serialise lose 3 months for nothing." },
    { title: "Waiting for every admit before visa prep", body: "Book the appointment after the first firm admit. You can switch universities later; you can't conjure appointment slots in July." },
    { title: "Leaving housing to arrival week", body: "Rooms in Munich or Berlin take weeks to land. Start the hunt with your visa wait, never after landing." },
  ],
  faqs: [
    { q: "How long does the whole Germany process take?", a: "8–12 months comfortably: roughly 2 months deciding, 2 months APS + tests, 2 months applications, 2 months admissions wait, 2–3 months blocked account + visa, then departure." },
    { q: "When should I start for winter 2027 intake?", a: "Now-ish: autumn 2026. APS by November–December, applications February–June, visa by August 2027. Starting after March 2027 makes it a scramble." },
    { q: "What's the single most time-critical step?", a: "APS. Everything downstream, university applications and the visa, waits on it, and you can't pay to expedite it." },
    { q: "Can I compress the timeline to 6 months?", a: "Possible if APS is fast, your documents are clean, and you accept fewer program choices. It works, but you trade selectivity and calm for speed." },
    { q: "Winter or summer intake, which is better?", a: "Winter (October): full course catalogue, aligned with German hiring cycles. Summer works when your target course offers it and your APS/IELTS are already done." },
  ],
  related: [
    { title: "APS Certificate Guide", href: "/guides/aps-certificate" },
    { title: "Uni-assist Guide", href: "/guides/uni-assist" },
    { title: "Blocked Account Guide", href: "/guides/blocked-account" },
    { title: "Student Visa Guide", href: "/guides/student-visa" },
  ],
};

export const Route = createFileRoute("/guides/application-timeline")({
  head: () => ({
    meta: [
      { title: "Germany Application Timeline 2026–27: Month-by-Month Plan for Indian Students | Sieg Counselling" },
      { name: "description", content: "The 12-month Germany plan: when to do APS, IELTS, uni-assist, blocked account and visa for winter intake. Deadlines, parallel tracks, and the delays that kill applications." },
    ],
    links: [{ rel: "canonical", href: "https://www.siegcounselling.com/guides/application-timeline" }],
    scripts: guideSchema(g).map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
  component: () => <GuidePage g={g} />,
});
