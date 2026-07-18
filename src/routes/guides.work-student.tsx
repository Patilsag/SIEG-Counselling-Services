import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, guideSchema, type GuideData } from "@/components/GuideLayout";

const g: GuideData = {
  slug: "work-student",
  h1: "Work Student (Werkstudent) Jobs in Germany: Rules, Pay & How to Get One",
  kicker: "Work · During studies",
  updated: "July 2026",
  directAnswer:
    "International students in Germany may work 140 full days (or 280 half days) per year. The best route is a Work Student (Werkstudent) role: up to 20 hours per week during the semester, full-time in breaks, industry-relevant, and paid roughly €13.90–17 per hour in 2026. It funds your living costs and doubles as the on-ramp to a German career.",
  definition: {
    term: "Werkstudent (Work Student)",
    text: "a legally privileged part-time employment status for enrolled students: reduced social-security contributions for you and the employer, up to 20 hours/week in lecture periods, and typically real work in your field, engineering, IT, marketing, rather than odd jobs.",
  },
  facts: [
    { label: "Work allowance", value: "140 full / 280 half days per year" },
    { label: "In-semester limit", value: "20 hours per week" },
    { label: "Typical pay 2026", value: "€13.90–17 / hour (min. wage €13.90)" },
    { label: "Monthly potential", value: "€1,100–1,400 gross at 20 h/week" },
  ],
  steps: [
    { title: "Settle in first (month 1–3)", body: "Anmeldung, bank account, insurance, semester rhythm. Starting a job in week 1 while lost in admin is how grades slip." },
    { title: "Build a German-style CV", body: "One page, photo optional, clean layout, concrete skills. Add German level honestly. A2 with 'actively learning' beats faked B2." },
    { title: "Hunt on the right channels", body: "LinkedIn and Indeed with filter 'Werkstudent', university job boards, company career pages, and notice boards. Applying directly to mid-size firms (Mittelstand) beats fighting for big-brand roles." },
    { title: "Apply in volume, tailor lightly", body: "20–40 applications is normal. Match each cover note to the role in 3 sentences; German recruiters value precision over essays." },
    { title: "Check the contract before signing", body: "Confirm Werkstudent status, hours ≤20/week in semester, and hourly rate at or above €13.90. Your enrolment certificate is required paperwork." },
  ],
  costs: [
    { item: "Income tax", amount: "~€0 at typical hours", note: "Annual income under the basic allowance (~€12k) is effectively tax-free via refund" },
    { item: "Pension contribution", amount: "~9.3% of gross", note: "Only significant deduction for Werkstudent contracts" },
    { item: "Health insurance", amount: "Unchanged (~€130/month student rate)", note: "Stays student insurance while under 20 h/week" },
  ],
  eligibility: [
    "Enrolled full-time at a German university (enrolment certificate required)",
    "Within 140 full / 280 half working days per year across all jobs",
    "Max 20 hours/week during lecture periods, unlimited in semester breaks",
    "No German required for many IT/engineering roles; B1 opens far more doors",
  ],
  mistakes: [
    { title: "Exceeding 20 hours in the semester", body: "You lose Werkstudent status, insurance reclassifies you as a regular employee, and the visa office notices. Track hours across all jobs combined." },
    { title: "Only applying to famous companies", body: "BMW gets 500 applicants per Werkstudent slot; the machine-tool firm two towns over gets five. Mittelstand roles are the realistic entry." },
    { title: "Working so much that grades collapse", body: "Failing modules can cost your visa faster than an empty wallet. 12–16 hours/week is the sustainable sweet spot." },
    { title: "Taking cash-in-hand work", body: "Undeclared work violates visa conditions. Not worth deportation risk over a few euros." },
  ],
  faqs: [
    { q: "How many hours can I work as a student in Germany?", a: "140 full days or 280 half days per year; during lecture periods a maximum of 20 hours per week. Semester breaks: full-time allowed." },
    { q: "What does a Werkstudent earn in 2026?", a: "Minimum wage is €13.90/hour; typical Werkstudent rates run €13.90–17, higher in IT. At 20 hours/week that's roughly €1,100–1,400 gross monthly." },
    { q: "Do I need German for a Work Student job?", a: "Not always. IT and engineering roles at international firms hire in English. B1 German roughly triples your options and matters for staying on after graduation." },
    { q: "Does Werkstudent work count against my studies visa?", a: "It's fully legal within the 140-day/20-hour limits. Exceed them and you risk your residence status, that's the line to respect." },
    { q: "Can a Werkstudent job become a full-time job?", a: "Frequently, it's Germany's most common student-to-employee pipeline. Perform well and the offer often arrives before you graduate." },
  ],
  related: [
    { title: "Student Visa Guide", href: "/guides/student-visa" },
    { title: "Blocked Account Guide", href: "/guides/blocked-account" },
    { title: "Application Timeline", href: "/guides/application-timeline" },
    { title: "APS Certificate Guide", href: "/guides/aps-certificate" },
  ],
};

export const Route = createFileRoute("/guides/work-student")({
  head: () => ({
    meta: [
      { title: "Werkstudent Guide 2026: Rules, Pay (€13.90+/hr), Finding Work Student Jobs | Sieg Counselling" },
      { name: "description", content: "Work Student (Werkstudent) in Germany: 140-day rule, 20 h/week limit, 2026 pay rates, tax and insurance basics, where to find roles, and mistakes that risk your visa." },
    ],
    links: [{ rel: "canonical", href: "https://www.siegcounselling.com/guides/work-student" }],
    scripts: guideSchema(g).map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
  component: () => <GuidePage g={g} />,
});
