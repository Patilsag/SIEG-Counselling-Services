import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideSchema, type GuideData } from "@/components/GuideLayout";

const g: GuideData = {
  slug: "aps-certificate",
  h1: "APS Certificate for Germany: The Complete Guide for Indian Students",
  kicker: "APS · Document verification",
  updated: "July 2026",
  directAnswer:
    "The APS certificate is a mandatory document-verification certificate that every Indian student needs before applying for a German student visa. It is issued by the APS office in New Delhi, costs ₹18,000, and typically takes 4–8 weeks. Apply for it first, before university applications, because nothing else in your visa process moves without it.",
  definition: {
    term: "APS (Akademische Prüfstelle)",
    text: "the Academic Evaluation Centre run by the German Embassy in India. It verifies that your Indian academic documents (10th, 12th, degree) are genuine and that your grades qualify you for German higher education. The result is a certificate German universities and visa officers require.",
  },
  facts: [
    { label: "Who needs it", value: "All Indian students (mandatory since Nov 2022)" },
    { label: "Fee", value: "₹18,000 (one-time)" },
    { label: "Typical processing", value: "4–8 weeks" },
    { label: "Validity", value: "Unlimited (one-time procedure)" },
  ],
  steps: [
    { title: "Collect documents", body: "10th and 12th marksheets, degree certificate and all semester transcripts, passport copy. Get everything scanned cleanly." },
    { title: "Register on the APS India portal", body: "Create your account at aps-india.de, fill the application form, and choose the 'regular procedure' if you already hold a degree or are in your final year." },
    { title: "Pay the ₹18,000 fee", body: "Online payment through the portal. Keep the receipt, you upload it with your application." },
    { title: "Courier the physical documents", body: "Send attested copies to the APS office in New Delhi. Use a trackable courier; this is where most delays start." },
    { title: "Wait for verification", body: "APS contacts your university and board to verify authenticity. Typically 4–8 weeks; plan a 3-month buffer in peak season (Jan–Apr)." },
    { title: "Receive your certificate", body: "You get printed certificates plus a digital copy. Upload it to uni-assist and include it in your visa file." },
  ],
  costs: [
    { item: "APS fee", amount: "₹18,000", note: "One-time, non-refundable" },
    { item: "Document attestation", amount: "₹500–2,000", note: "Notary charges vary by city" },
    { item: "Courier to New Delhi", amount: "₹300–800", note: "Use trackable service" },
  ],
  eligibility: [
    "You are an Indian passport holder applying for a German student visa",
    "You have completed (or are completing) 12th and a bachelor's degree recognised by an Indian board/university",
    "Final-year students can apply with provisional certificates and 6+ semester transcripts",
    "Exception: you don't need APS if you hold a German APS-exempt scholarship (e.g., DAAD), rare",
  ],
  mistakes: [
    { title: "Applying for APS after university admission", body: "APS takes weeks. If you wait for your admit, you can miss the visa appointment window. Start APS the moment you decide on Germany." },
    { title: "Name mismatches across documents", body: "Passport, marksheets, and degree must show the same spelling. Fix discrepancies with an affidavit before applying, mismatches trigger rejections." },
    { title: "Sending unattested photocopies", body: "APS wants attested copies. Plain photocopies get returned and cost you 2–3 weeks." },
    { title: "Wrong procedure type", body: "Choosing the visa-interview procedure when you qualify for the regular one adds unnecessary steps. Degree holders and final-year students use the regular document procedure." },
  ],
  faqs: [
    { q: "How long does the APS certificate take in 2026?", a: "Typically 4–8 weeks after your complete documents reach the New Delhi office. During peak season (January–April) it can stretch longer, so keep a 3-month buffer." },
    { q: "How much does APS cost?", a: "₹18,000, paid once online. It's non-refundable, and the certificate never expires." },
    { q: "Can I apply to universities before APS arrives?", a: "You can start uni-assist applications in parallel, but many universities and every German visa appointment require the APS certificate. Get APS moving first." },
    { q: "Is there an APS interview?", a: "For most degree-holders, no, it's a pure document check. Interviews apply to special cases (e.g., unclear academic records)." },
    { q: "What if my APS is rejected?", a: "Rejections usually trace to document discrepancies. Fix the issue (affidavit, university verification letter) and reapply. We help students diagnose the cause first." },
  ],
  related: [
    { title: "Uni-assist Guide", href: "/guides/uni-assist" },
    { title: "Student Visa Guide", href: "/guides/student-visa" },
    { title: "Application Timeline", href: "/guides/application-timeline" },
    { title: "Blocked Account Guide", href: "/guides/blocked-account" },
  ],
};

export const Route = createFileRoute("/guides/aps-certificate")({
  head: () => ({
    meta: [
      { title: "APS Certificate Germany 2026: Fee, Timeline, Process for Indian Students | Sieg Counselling" },
      { name: "description", content: "APS certificate explained: ₹18,000 fee, 4–8 week timeline, exact steps, documents, and the mistakes that cost Indian students months. By a counsellor living in Germany." },
    ],
    links: [{ rel: "canonical", href: "https://www.siegcounselling.com/guides/aps-certificate" }],
    scripts: guideSchema(g).map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
  component: () => <GuidePage g={g} />,
});
