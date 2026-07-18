import type { ReactNode } from "react";

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideData {
  slug: string;
  h1: string;
  kicker: string;
  updated: string;
  /** One-paragraph direct answer, first thing readers and AI engines see. */
  directAnswer: string;
  definition: { term: string; text: string };
  facts: { label: string; value: string }[];
  steps: { title: string; body: string }[];
  costs: { item: string; amount: string; note?: string }[];
  eligibility: string[];
  mistakes: { title: string; body: string }[];
  faqs: GuideFaq[];
  related: { title: string; href: string }[];
}

/** Build the JSON-LD blocks for a guide page (Article + Breadcrumb + FAQ). */
export function guideSchema(g: GuideData) {
  const base = "https://www.siegcounselling.com";
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.h1,
      description: g.directAnswer,
      dateModified: "2026-07-17",
      author: {
        "@type": "Person",
        name: "Sagar S. Patil",
        description: "Founder of Sieg Counselling Services. MSc in Germany, living there since 2019.",
      },
      publisher: { "@type": "Organization", name: "Sieg Counselling Services", url: base },
      mainEntityOfPage: `${base}/guides/${g.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${base}/#contact` },
        { "@type": "ListItem", position: 3, name: g.h1, item: `${base}/guides/${g.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 mb-4 text-2xl md:text-3xl text-[var(--navy-900)]">{children}</h2>;
}

export function GuidePage({ g }: { g: GuideData }) {
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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--muted-ink)]">
          <a href="/" className="hover:text-[var(--navy-700)]">Home</a>
          <span className="mx-1.5">/</span>
          <span>Guides</span>
          <span className="mx-1.5">/</span>
          <span className="text-[var(--navy-800)]">{g.h1}</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-2)]">
          <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> {g.kicker}
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl text-[var(--navy-900)]">{g.h1}</h1>
        <p className="mt-2 text-sm text-[var(--muted-ink)]">Updated {g.updated} · By Sagar S. Patil, living in Germany since 2019</p>

        {/* Direct answer, the citation block */}
        <p className="mt-7 text-[1.08rem] leading-relaxed text-[var(--ink-2)] border-l-[3px] border-[var(--gold)] pl-5">
          {g.directAnswer}
        </p>

        {/* Definition */}
        <div className="mt-8 rounded-2xl border border-border bg-[var(--muted)] p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-2)]">Definition</div>
          <p className="mt-2 text-[0.98rem] text-[var(--ink-2)]"><b className="text-[var(--navy-900)]">{g.definition.term}</b>: {g.definition.text}</p>
        </div>

        {/* Quick facts */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {g.facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-sm)]">
              <div className="text-xs uppercase tracking-wide text-[var(--muted-ink)]">{f.label}</div>
              <div className="mt-1 font-semibold text-[var(--navy-900)]">{f.value}</div>
            </div>
          ))}
        </div>

        <SectionHeading>Step-by-step process</SectionHeading>
        <ol className="space-y-5">
          {g.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full font-heading text-sm" style={{ background: "var(--gradient-gold)", color: "var(--navy-950)" }}>{i + 1}</span>
              <div>
                <h3 className="font-sans font-semibold text-[var(--navy-900)]">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] text-[var(--ink-2)]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <SectionHeading>Costs</SectionHeading>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] text-left">
                <th className="px-4 py-3 font-semibold text-[var(--navy-900)]">Item</th>
                <th className="px-4 py-3 font-semibold text-[var(--navy-900)]">Amount</th>
                <th className="px-4 py-3 font-semibold text-[var(--navy-900)]">Note</th>
              </tr>
            </thead>
            <tbody>
              {g.costs.map((c) => (
                <tr key={c.item} className="border-t border-border">
                  <td className="px-4 py-3 text-[var(--ink-2)]">{c.item}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--navy-900)] whitespace-nowrap">{c.amount}</td>
                  <td className="px-4 py-3 text-[var(--muted-ink)]">{c.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHeading>Who needs this / eligibility</SectionHeading>
        <ul className="space-y-2">
          {g.eligibility.map((e) => (
            <li key={e} className="flex gap-3 text-[0.97rem] text-[var(--ink-2)]">
              <svg className="mt-1 flex-none text-[var(--gold-2)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"/></svg>
              {e}
            </li>
          ))}
        </ul>

        <SectionHeading>Common mistakes to avoid</SectionHeading>
        <div className="space-y-4">
          {g.mistakes.map((m) => (
            <div key={m.title} className="rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
              <h3 className="font-sans font-semibold text-[var(--navy-900)]">✗ {m.title}</h3>
              <p className="mt-1 text-[0.95rem] text-[var(--ink-2)]">{m.body}</p>
            </div>
          ))}
        </div>

        <SectionHeading>Frequently asked questions</SectionHeading>
        <div className="divide-y divide-border rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
          {g.faqs.map((f) => (
            <details key={f.q} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans font-semibold text-[var(--navy-900)]">
                {f.q}
                <svg className="flex-none text-[var(--gold-2)] transition-transform duration-300 group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m6 9 6 6 6-6"/></svg>
              </summary>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{f.a}</p>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[var(--navy-900)] p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl">Want this handled with you, not alone?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/70">First call is free. We tell you honestly what you can DIY and where support is worth it.</p>
          <a href="/#contact" className="btn-gold mt-5 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[0.95rem]">Book a free call</a>
        </div>

        {/* Related guides */}
        <div className="mt-12">
          <h2 className="mb-4 text-xl text-[var(--navy-900)]">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {g.related.map((r) => (
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
