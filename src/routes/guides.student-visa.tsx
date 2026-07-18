import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideSchema, type GuideData } from "@/components/GuideLayout";

const g: GuideData = {
  slug: "student-visa",
  h1: "German Student Visa from India: Documents, Timeline & Interview 2026",
  kicker: "Visa · National (D) visa",
  updated: "July 2026",
  directAnswer:
    "Indian students apply for the German national (D) student visa with an admission letter, APS certificate, blocked account of €11,904, and health insurance. The fee is €75, appointments run through the German missions' booking system, and processing typically takes 4–12 weeks, book your slot the day your admission letter arrives. After graduating you can stay 18 months to find a job.",
  definition: {
    term: "National visa (D visa) for studies",
    text: "the long-stay visa Germany issues for degree programs. It gets you into the country; within the first months you convert it into a residence permit for study at the local immigration office (Ausländerbehörde).",
  },
  facts: [
    { label: "Visa fee", value: "€75" },
    { label: "Processing", value: "4–12 weeks (India)" },
    { label: "Financial proof", value: "€11,904 blocked account" },
    { label: "Post-study right", value: "18-month job-seeker permit" },
  ],
  steps: [
    { title: "Book the appointment early", body: "Slots in Delhi, Mumbai, Chennai, Bengaluru, Kolkata fill fast in visa season (May–August). Book the moment you have an admission letter, you can refine documents later." },
    { title: "Assemble the file", body: "Admission letter, APS certificate, blocking confirmation (€11,904), travel health insurance + proof of German health insurance from enrolment, IELTS/TOEFL, all academic documents, SOP/CV, passport, photos, filled VIDEX form." },
    { title: "Attend the appointment", body: "Documents check + biometrics + short interview: why this course, why Germany, how financed, plans after. Honest, specific answers beat rehearsed speeches." },
    { title: "Track and wait", body: "Typical 4–12 weeks from India. No news is normal; the embassy contacts you if anything's missing. Don't book flights before approval." },
    { title: "After arrival: convert to residence permit", body: "Register your address (Anmeldung), then apply at the Ausländerbehörde for the study residence permit before the visa's 3–6 month validity ends." },
  ],
  costs: [
    { item: "Visa fee", amount: "€75", note: "Paid at appointment, in INR equivalent" },
    { item: "Blocked account", amount: "€11,904", note: "Proof of funds, returned monthly" },
    { item: "Health insurance (travel + student)", amount: "€30–120/month", note: "Public student insurance ~€130/month after enrolment" },
    { item: "VFS/courier charges", amount: "₹1,000–3,000", note: "Where applicable" },
  ],
  eligibility: [
    "Admission (or conditional admission) to a recognised German university program",
    "APS certificate, mandatory for Indian applicants",
    "Proof of funds: €11,904 blocked account, sponsor declaration, or full scholarship",
    "Health insurance cover from day of travel",
  ],
  mistakes: [
    { title: "Waiting for 'complete' documents before booking", body: "Appointment queues run weeks-long in season. Book first, complete the file while you wait." },
    { title: "Financial proof €50 short", body: "Transfers lose money to charges. The embassy checks the exact blocking confirmation amount, always send a buffer." },
    { title: "Generic interview answers", body: "'Germany has good education' convinces nobody. Name your course modules, professors, target companies, specifics signal a genuine student." },
    { title: "Booking flights before approval", body: "Processing can hit 12 weeks. Non-refundable tickets before the decision are money at risk." },
  ],
  faqs: [
    { q: "How long does a German student visa take from India?", a: "Officially 4–12 weeks after the appointment. Most 2025–26 applicants in our experience heard back within 4–8 weeks; peak season runs slower." },
    { q: "What financial proof does the embassy accept?", a: "A blocked account of €11,904, a formal sponsor declaration (Verpflichtungserklärung) by a German resident, or a recognised full scholarship. Indian family bank statements alone don't qualify." },
    { q: "What is asked in the visa interview?", a: "Why this course and university, how it connects to your background, how you're financing the year, and your post-study plan. It's short, clarity and honesty matter most." },
    { q: "Can the visa be rejected, and then what?", a: "Yes, common causes are weak financial proof, inconsistent documents, or unconvincing study motivation. You can remonstrate (appeal) or reapply after fixing the cause." },
    { q: "How long can I stay after graduation?", a: "Germany grants an 18-month residence permit to look for a job matching your degree. Once employed, you switch to a work permit or EU Blue Card." },
  ],
  related: [
    { title: "Blocked Account Guide", href: "/guides/blocked-account" },
    { title: "APS Certificate Guide", href: "/guides/aps-certificate" },
    { title: "Application Timeline", href: "/guides/application-timeline" },
    { title: "Work Student Guide", href: "/guides/work-student" },
  ],
};

export const Route = createFileRoute("/guides/student-visa")({
  head: () => ({
    meta: [
      { title: "German Student Visa from India 2026: Documents, Timeline, Interview | Sieg Counselling" },
      { name: "description", content: "German student visa for Indians: €75 fee, 4–12 week timeline, full document checklist, blocked account requirement, interview questions, and the mistakes that cause rejections." },
    ],
    links: [{ rel: "canonical", href: "https://www.siegcounselling.com/guides/student-visa" }],
    scripts: guideSchema(g).map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
  component: () => <GuidePage g={g} />,
});
