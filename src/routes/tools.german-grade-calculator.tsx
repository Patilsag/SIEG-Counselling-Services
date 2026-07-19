import { createFileRoute } from "@tanstack/react-router";
import { GradeConverter } from "@/components/GradeConverter";

const BASE = "https://www.siegcounselling.com";
const URL = `${BASE}/tools/german-grade-calculator`;

const FAQS = [
  {
    q: "What is the Modified Bavarian Formula?",
    a: "It is the standard method German universities use to convert a foreign grade into the German 1.0–5.0 scale. The formula is: German grade = 1 + 3 × (Nmax − Nd) ÷ (Nmax − Nmin), where Nmax is the best possible grade in your system, Nmin is the minimum passing grade, and Nd is your actual grade.",
  },
  {
    q: "What is a good German grade for a Master's?",
    a: "1.0–1.5 is excellent (sehr gut) and competitive everywhere, including TU9. 1.6–2.5 is good (gut) and sufficient for most public universities. 2.6–3.5 is satisfactory (befriedigend) and still workable, though competitive programs may reject it. Above 3.5 limits your options considerably.",
  },
  {
    q: "Is 2.5 good enough to study in Germany?",
    a: "Yes, for many public universities. A 2.5 sits in the 'gut' band and clears the typical cut-off for a large number of English-taught Master's programs. Highly competitive courses at TU9 universities often want 2.0 or better, so 2.5 means shortlisting realistically rather than only chasing famous names.",
  },
  {
    q: "Does uni-assist use this formula?",
    a: "Uni-assist and most German universities use the Modified Bavarian Formula as the standard basis, but the official conversion is theirs, not yours. The pass mark (Nmin) they apply to your transcript can differ from the one you assume, which changes the result. Treat any calculator output as an estimate.",
  },
  {
    q: "How do I convert an Indian CGPA to a German grade?",
    a: "Select the 10-point CGPA option and enter your CGPA. The default assumes a best grade of 10 and a pass mark of 4. If your university passes students at 5.0 CGPA, change the pass mark in the advanced section, because that value affects the result more than any other input.",
  },
  {
    q: "Why does my pass mark change the result so much?",
    a: "The formula measures the distance between your grade and the best grade, relative to the full passing range. Widening or narrowing that range moves your position within it. A percentage transcript that passes at 35% produces a noticeably different German grade than the same marks with a 50% pass mark.",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "German Grade Converter",
    url: URL,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    description:
      "Convert an Indian percentage, 10-point CGPA or US 4.0 GPA into the German 1.0–5.0 grade scale using the Modified Bavarian Formula.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: "Sieg Counselling Services", url: BASE },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE}/tools/german-grade-calculator` },
      { "@type": "ListItem", position: 3, name: "German Grade Converter", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export const Route = createFileRoute("/tools/german-grade-calculator")({
  head: () => ({
    meta: [
      { title: "German Grade Converter: Percentage & CGPA to German Grade (Bavarian Formula) | Sieg Counselling" },
      {
        name: "description",
        content:
          "Free German grade calculator. Convert Indian percentage, 10-point CGPA or US GPA into the German 1.0–5.0 scale with the Modified Bavarian Formula. Includes grade bands and what each grade means for admission.",
      },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: schema.map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
  component: GradeCalculatorPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 mb-4 text-2xl md:text-3xl text-[var(--navy-900)]">{children}</h2>;
}

function GradeCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-[var(--navy-950)] text-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/brand/falcon-light.png" alt="Sieg Counselling Services logo" width={34} height={34} style={{ objectFit: "contain" }} />
            <span className="font-heading text-[1.05rem] leading-none">
              <b className="font-semibold tracking-tight">Sieg</b>
              <span className="ml-1 opacity-70">Counselling</span>
            </span>
          </a>
          <a href="/#contact" className="btn-gold rounded-full px-5 py-2 text-sm">Book a free call</a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--muted-ink)]">
          <a href="/" className="hover:text-[var(--navy-700)]">Home</a>
          <span className="mx-1.5">/</span>
          <span>Tools</span>
          <span className="mx-1.5">/</span>
          <span className="text-[var(--navy-800)]">German Grade Converter</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-2)]">
          <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Free tool
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl text-[var(--navy-900)]">German Grade Converter</h1>
        <p className="mt-2 text-sm text-[var(--muted-ink)]">Updated July 2026 · By Sagar S. Patil, living in Germany since 2019</p>

        <p className="mt-7 border-l-[3px] border-[var(--gold)] pl-5 text-[1.08rem] leading-relaxed text-[var(--ink-2)]">
          Turn your Indian percentage, 10-point CGPA or US 4.0 GPA into a German grade on the 1.0–5.0 scale, using the Modified Bavarian Formula
          that German universities and uni-assist apply. 1.0 is the best grade, 4.0 is the pass mark, and anything beyond that is a fail.
        </p>

        <div className="mt-8">
          <GradeConverter />
        </div>

        <H2>How the Modified Bavarian Formula works</H2>
        <p className="text-[0.97rem] leading-relaxed text-[var(--ink-2)]">
          German universities do not simply map percentages to grades. They measure how far your result sits above the pass mark, relative to the
          full range of passing marks available to you:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-[var(--muted)] p-5 text-center">
          <code className="text-[0.98rem] font-semibold text-[var(--navy-900)]">
            German grade = 1 + 3 × (N<sub>max</sub> − N<sub>d</sub>) ÷ (N<sub>max</sub> − N<sub>min</sub>)
          </code>
        </div>
        <ul className="mt-4 space-y-2 text-[0.97rem] text-[var(--ink-2)]">
          <li><b className="text-[var(--navy-900)]">N<sub>max</sub></b>: the best grade possible in your system (100%, 10 CGPA, 4.0 GPA)</li>
          <li><b className="text-[var(--navy-900)]">N<sub>min</sub></b>: your university's minimum passing grade, not zero</li>
          <li><b className="text-[var(--navy-900)]">N<sub>d</sub></b>: your actual grade</li>
        </ul>

        <H2>Worked example</H2>
        <p className="text-[0.97rem] leading-relaxed text-[var(--ink-2)]">
          An Indian student scores <b>75%</b>. Their university awards a maximum of 100% and passes students at 40%.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
          <code className="block text-[0.95rem] leading-relaxed text-[var(--ink-2)]">
            1 + 3 × (100 − 75) ÷ (100 − 40)<br />
            = 1 + 3 × 25 ÷ 60<br />
            = 1 + 1.25<br />
            = <b className="text-[var(--navy-900)]">2.3 (gut)</b>
          </code>
        </div>
        <p className="mt-4 text-[0.97rem] leading-relaxed text-[var(--ink-2)]">
          Change only the pass mark to 50% and the same 75% becomes <b>2.5</b>. This is why the pass mark matters more than any other input, and why
          two students with identical marks can receive different German grades.
        </p>

        <H2>German grade bands and what they mean</H2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] text-left">
                <th className="px-4 py-3 font-semibold text-[var(--navy-900)]">German grade</th>
                <th className="px-4 py-3 font-semibold text-[var(--navy-900)]">Meaning</th>
                <th className="px-4 py-3 font-semibold text-[var(--navy-900)]">Roughly equals</th>
                <th className="px-4 py-3 font-semibold text-[var(--navy-900)]">Admission reality</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1.0 – 1.5", "Sehr gut (very good)", "85%+ / 9.0+ CGPA", "Competitive everywhere, including TU9"],
                ["1.6 – 2.5", "Gut (good)", "70–85% / 7.5–9.0 CGPA", "Strong for most public universities"],
                ["2.6 – 3.5", "Befriedigend (satisfactory)", "55–70% / 6.0–7.5 CGPA", "Workable; shortlist carefully"],
                ["3.6 – 4.0", "Ausreichend (sufficient)", "Around the pass mark", "Limited options; profile matters more"],
                ["Above 4.0", "Nicht bestanden (fail)", "Below pass mark", "Not eligible for admission"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-[var(--navy-900)]">{row[0]}</td>
                  <td className="px-4 py-3 text-[var(--ink-2)]">{row[1]}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-[var(--ink-2)]">{row[2]}</td>
                  <td className="px-4 py-3 text-[var(--muted-ink)]">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[var(--muted-ink)]">
          Equivalences are indicative. Universities set their own cut-offs, and some weight your final-year marks more heavily.
        </p>

        <H2>What your grade does and doesn't decide</H2>
        <p className="text-[0.97rem] leading-relaxed text-[var(--ink-2)]">
          A German grade is a filter, not a verdict. Most public universities publish a cut-off, and clearing it puts you in the pool. What
          separates applications after that is course fit, your SOP, relevant projects or work, and whether your documents are clean. Students with a
          2.6 and a sharp, specific application regularly beat a 1.9 with a generic one.
        </p>
        <p className="mt-3 text-[0.97rem] leading-relaxed text-[var(--ink-2)]">
          The honest use of this tool: convert your grade, then build a shortlist that matches it, instead of applying only to the five universities
          everyone has heard of.
        </p>

        <H2>Frequently asked questions</H2>
        <div className="divide-y divide-border rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans font-semibold text-[var(--navy-900)]">
                {f.q}
                <svg className="flex-none text-[var(--gold-2)] transition-transform duration-300 group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-[var(--navy-900)] p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl">Know your grade. Now build the shortlist.</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
            The first call is free. We read your grade honestly and tell you which universities are realistic, which are a stretch, and which are a
            waste of your application fee.
          </p>
          <a href="/#contact" className="btn-gold mt-5 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[0.95rem]">Book a free call</a>
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-xl text-[var(--navy-900)]">Next steps in your Germany plan</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Uni-assist Guide", href: "/guides/uni-assist" },
              { title: "APS Certificate Guide", href: "/guides/aps-certificate" },
              { title: "Application Timeline", href: "/guides/application-timeline" },
              { title: "Student Visa Guide", href: "/guides/student-visa" },
            ].map((r) => (
              <a key={r.href} href={r.href} className="rounded-xl border border-border bg-white px-5 py-4 font-medium text-[var(--navy-800)] shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:text-[var(--gold-2)]">
                {r.title} →
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-[var(--muted-ink)]">
        © {new Date().getFullYear()} Sieg Counselling Services ·{" "}
        <a href="/" className="underline underline-offset-2 hover:text-[var(--navy-700)]">Home</a> ·{" "}
        <a href="/#faq" className="underline underline-offset-2 hover:text-[var(--navy-700)]">FAQ</a> ·{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-[var(--navy-700)]">Privacy</a>
      </footer>
    </div>
  );
}
