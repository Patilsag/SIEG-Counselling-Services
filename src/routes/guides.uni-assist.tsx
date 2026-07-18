import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideSchema, type GuideData } from "@/components/GuideLayout";

const g: GuideData = {
  slug: "uni-assist",
  h1: "Uni-assist Explained: VPD, Fees & Application Process for Indian Students",
  kicker: "Applications · Portal",
  updated: "July 2026",
  directAnswer:
    "Uni-assist is the central application portal that evaluates international students' documents for 170+ German universities. Indian applicants typically pay €75 for the first application and €30 for each additional one per semester. Processing takes 4–6 weeks, so submit at least 6 weeks before your university's deadline, for winter intake, that means early June, not July 14.",
  definition: {
    term: "Uni-assist (and VPD)",
    text: "a non-profit that checks whether your Indian qualifications meet German entry requirements. Some universities want a full application through uni-assist; others only want its VPD (Vorprüfungsdokumentation), a preliminary evaluation certificate you then upload to the university's own portal.",
  },
  facts: [
    { label: "First application fee", value: "€75 per semester" },
    { label: "Each additional", value: "€30" },
    { label: "Processing time", value: "4–6 weeks" },
    { label: "Universities covered", value: "170+ (not all, check each uni)" },
  ],
  steps: [
    { title: "Check whether your university uses uni-assist", body: "Look on the university's admissions page: 'apply via uni-assist', 'VPD required', or direct application. TU9 members differ. RWTH wants VPD, TUM has its own portal." },
    { title: "Create your My assist account", body: "One account handles all applications. Fill your educational history once, carefully, it's reused everywhere." },
    { title: "Upload documents", body: "APS certificate, 10th/12th marksheets, degree + transcripts, IELTS/TOEFL, passport. Certified copies by post only if a university explicitly demands paper." },
    { title: "Select courses and pay", body: "€75 first + €30 each additional application in the same semester. Pay by card; applications stay 'in progress' until payment clears." },
    { title: "Track and respond fast", body: "Uni-assist emails if documents are missing, respond within days, not weeks. Once evaluated, your application (or VPD) is forwarded and you apply onward if VPD-route." },
  ],
  costs: [
    { item: "First application / VPD", amount: "€75", note: "Per semester" },
    { item: "Each additional application", amount: "€30", note: "Same semester" },
    { item: "Certified copies + postage", amount: "₹1,000–3,000", note: "Only if paper documents demanded" },
  ],
  eligibility: [
    "Anyone with non-German school/degree qualifications applying to a uni-assist member university",
    "VPD route: required by many universities (e.g., RWTH, many TUs) even when you apply on their own portal",
    "Not needed at universities with fully direct admissions (e.g., TUM), always verify per university",
  ],
  mistakes: [
    { title: "Submitting in the deadline week", body: "Uni-assist needs 4–6 weeks. A July 10 submission for a July 15 deadline fails. For winter intake, submit by early June." },
    { title: "Assuming every university uses uni-assist", body: "TUM, Stuttgart (some courses), and others take direct applications. Paying uni-assist for them wastes €75 and weeks." },
    { title: "One combined PDF for everything", body: "Upload each document as its own file, named clearly. Merged PDFs trigger 'missing document' emails." },
    { title: "Ignoring the VPD validity", body: "A VPD is typically valid for one year. Reusing an old one for a new intake can get you rejected on a technicality." },
  ],
  faqs: [
    { q: "What is the uni-assist fee for Indian students in 2026?", a: "€75 for the first application in a semester and €30 for each additional one. A VPD request costs the same €75." },
    { q: "How long does uni-assist take?", a: "4–6 weeks for evaluation. During deadline season it runs at the top of that range, submit at least 6 weeks early." },
    { q: "What is a VPD?", a: "Vorprüfungsdokumentation, a preliminary review certificate stating your Indian grades converted to the German system. Some universities want you to apply on their portal with the VPD attached." },
    { q: "Do I need APS before uni-assist?", a: "Yes for most universities, the APS certificate is part of the standard Indian document set uni-assist expects." },
    { q: "Can uni-assist reject me?", a: "Uni-assist doesn't admit or reject on merit, it verifies eligibility. If it finds you formally ineligible for a course, the application isn't forwarded, and it explains why." },
  ],
  related: [
    { title: "APS Certificate Guide", href: "/guides/aps-certificate" },
    { title: "Application Timeline", href: "/guides/application-timeline" },
    { title: "Student Visa Guide", href: "/guides/student-visa" },
    { title: "Blocked Account Guide", href: "/guides/blocked-account" },
  ],
};

export const Route = createFileRoute("/guides/uni-assist")({
  head: () => ({
    meta: [
      { title: "Uni-assist Guide 2026: VPD, Fees (€75), Timeline for Indian Students | Sieg Counselling" },
      { name: "description", content: "Uni-assist and VPD explained: €75 + €30 fees, 4–6 week processing, which universities need it, exact steps and deadline math for Indian applicants." },
    ],
    links: [{ rel: "canonical", href: "https://www.siegcounselling.com/guides/uni-assist" }],
    scripts: guideSchema(g).map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
  component: () => <GuidePage g={g} />,
});
