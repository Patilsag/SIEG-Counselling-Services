import type { ReactNode } from "react";

/** Shared shell for the legal pages (privacy / terms / imprint). */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
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
          <a href="/" className="text-sm text-white/70 transition hover:text-white">← Back to site</a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-4xl text-[var(--navy-900)]">{title}</h1>
        <p className="mt-2 text-sm text-[var(--muted-ink)]">Last updated: {updated}</p>
        <div className="legal-prose mt-8 space-y-4 text-[0.97rem] leading-relaxed text-[var(--ink-2)]">
          {children}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-[var(--muted-ink)]">
        © {new Date().getFullYear()} Sieg Counselling Services ·{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-[var(--navy-700)]">Privacy</a> ·{" "}
        <a href="/terms" className="underline underline-offset-2 hover:text-[var(--navy-700)]">Terms</a> ·{" "}
        <a href="/imprint" className="underline underline-offset-2 hover:text-[var(--navy-700)]">Imprint</a>
      </footer>
    </div>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 text-xl text-[var(--navy-900)]">{children}</h2>;
}
