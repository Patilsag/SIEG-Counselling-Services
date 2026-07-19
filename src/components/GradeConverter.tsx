import { useEffect, useMemo, useState } from "react";

/** Fire a GA4 event; no-op when gtag isn't loaded. */
function track(event: string, params?: Record<string, string>) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}

type SystemKey = "pct" | "cgpa10" | "gpa4" | "custom";

const SYSTEMS: Record<SystemKey, { label: string; nmax: number; nmin: number; placeholder: string; step: string }> = {
  pct: { label: "Percentage (0–100)", nmax: 100, nmin: 40, placeholder: "e.g. 75", step: "0.1" },
  cgpa10: { label: "10-point CGPA", nmax: 10, nmin: 4, placeholder: "e.g. 8.2", step: "0.01" },
  gpa4: { label: "4.0 GPA (US)", nmax: 4, nmin: 2, placeholder: "e.g. 3.5", step: "0.01" },
  custom: { label: "Custom scale", nmax: 100, nmin: 50, placeholder: "your grade", step: "0.01" },
};

/** German grade band: descriptor + the token colour used for the number. */
function band(g: number) {
  if (g <= 1.5) return { de: "Sehr gut", en: "Very good", color: "var(--band-good)" };
  if (g <= 2.5) return { de: "Gut", en: "Good", color: "var(--band-good)" };
  if (g <= 3.5) return { de: "Befriedigend", en: "Satisfactory", color: "var(--gold-soft)" };
  if (g <= 4.0) return { de: "Ausreichend", en: "Sufficient", color: "var(--band-warn)" };
  return { de: "Nicht bestanden", en: "Fail", color: "var(--band-bad)" };
}

export function GradeConverter() {
  const [system, setSystem] = useState<SystemKey>("pct");
  const [gradeInput, setGradeInput] = useState("");
  const [nmax, setNmax] = useState(String(SYSTEMS.pct.nmax));
  const [nmin, setNmin] = useState(String(SYSTEMS.pct.nmin));

  // Switching system resets the scale to that system's defaults.
  useEffect(() => {
    setNmax(String(SYSTEMS[system].nmax));
    setNmin(String(SYSTEMS[system].nmin));
  }, [system]);

  const result = useMemo(() => {
    const nd = parseFloat(gradeInput);
    const mx = parseFloat(nmax);
    const mn = parseFloat(nmin);

    if (gradeInput.trim() === "" || Number.isNaN(nd)) return { state: "empty" as const, message: "Enter your grade" };
    if (Number.isNaN(mx) || Number.isNaN(mn) || mx <= mn)
      return { state: "error" as const, message: "Check the scale", hint: "Best grade must be higher than the pass mark." };
    if (nd > mx) return { state: "error" as const, message: "Check your grade", hint: `Your grade can't be higher than ${mx}.` };
    if (nd < 0) return { state: "error" as const, message: "Check your grade", hint: "Grade can't be negative." };

    // Modified Bavarian Formula
    const raw = 1 + (3 * (mx - nd)) / (mx - mn);
    const clamped = raw < 1 ? 1 : raw;
    const rounded = Math.round(clamped * 10) / 10;
    const failed = rounded > 4.0;
    const shown = failed ? 5.0 : rounded;
    const b = band(shown);
    const meterPct = Math.max(0, Math.min(100, ((shown - 1) / 4) * 100));

    return {
      state: "ok" as const,
      display: shown.toFixed(1),
      band: b,
      meterPct,
      hint: nd < mn ? "Below your pass mark, so this counts as a fail in the German system." : undefined,
    };
  }, [gradeInput, nmax, nmin]);

  // Report a conversion once the user has a valid grade (debounced by input pause).
  useEffect(() => {
    if (result.state !== "ok") return;
    const t = setTimeout(() => track("grade_converted", { system, german_grade: result.display }), 900);
    return () => clearTimeout(t);
  }, [result, system]);

  const fieldClass =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-[0.98rem] outline-none transition focus:border-[var(--navy-700)] focus:ring-2 focus:ring-[var(--navy-700)]/20";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-md)]">
      <div className="grid gap-5 p-6 sm:p-8">
        <div>
          <label htmlFor="system" className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">
            Your grading system
          </label>
          <div className="relative">
            <select
              id="system"
              value={system}
              onChange={(e) => setSystem(e.target.value as SystemKey)}
              className={`${fieldClass} appearance-none pr-11`}
            >
              {(Object.keys(SYSTEMS) as SystemKey[]).map((k) => (
                <option key={k} value={k}>
                  {SYSTEMS[k].label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-ink)]"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div>
          <label htmlFor="grade" className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">
            Your grade
          </label>
          <input
            id="grade"
            type="number"
            inputMode="decimal"
            step={SYSTEMS[system].step}
            placeholder={SYSTEMS[system].placeholder}
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
            className={fieldClass}
            aria-describedby="grade-hint"
          />
          <p id="grade-hint" className={`mt-1.5 text-xs ${result.state === "error" ? "font-medium text-red-600" : "text-[var(--muted-ink)]"}`}>
            {("hint" in result && result.hint) || " "}
          </p>
        </div>

        <details className="border-t border-dashed border-border pt-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--navy-800)] marker:hidden">
            <span className="text-[var(--gold-2)]">›</span> Adjust the scale (advanced)
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nmax" className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">
                Best grade (N<sub>max</sub>)
              </label>
              <input id="nmax" type="number" step="0.01" value={nmax} onChange={(e) => setNmax(e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="nmin" className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">
                Pass mark (N<sub>min</sub>)
              </label>
              <input id="nmin" type="number" step="0.01" value={nmin} onChange={(e) => setNmin(e.target.value)} className={fieldClass} />
            </div>
            <p className="text-xs leading-relaxed text-[var(--muted-ink)] sm:col-span-2">
              N<sub>min</sub> is your university's <b className="text-[var(--ink)]">minimum passing grade</b>, not zero. This single number changes
              your result the most. If your transcript passes at 50%, set it to 50.
            </p>
          </div>
        </details>
      </div>

      {/* Result panel */}
      <div className="relative mx-6 overflow-hidden rounded-2xl border border-[var(--gold)]/35 p-7 sm:mx-8" style={{ background: "var(--gradient-hero)" }} aria-live="polite">
        <div className="pointer-events-none absolute inset-2.5 rounded-xl border border-[var(--gold)]/25" aria-hidden="true" />
        <div className="relative">
          <div className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold-soft)]">Deutsche Note</div>
          <div
            className="text-center font-heading text-[clamp(3.6rem,18vw,5.2rem)] leading-none"
            style={{ color: result.state === "ok" ? result.band.color : "#fff", fontVariantNumeric: "tabular-nums" }}
          >
            {result.state === "ok" ? result.display : "—"}
          </div>
          <div className="text-center text-white/90">
            <span className="font-heading text-xl">{result.state === "ok" ? result.band.de : result.message}</span>
            {result.state === "ok" && (
              <span className="mt-0.5 block text-[0.72rem] uppercase tracking-wider text-white/60">{result.band.en}</span>
            )}
          </div>

          {/* Scale meter */}
          <div className="mt-6">
            <div
              className="relative h-2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--band-good) 0%, var(--band-good) 38%, var(--gold-soft) 38%, var(--gold-soft) 63%, var(--band-warn) 63%, var(--band-warn) 75%, var(--band-bad) 75%)",
              }}
            >
              {result.state === "ok" && (
                <div
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-white transition-[left] duration-300"
                  style={{ left: `${result.meterPct}%`, borderColor: result.band.color }}
                />
              )}
            </div>
            <div className="mt-2 flex justify-between text-[0.68rem] text-white/50" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span>1.0 best</span><span>2.0</span><span>3.0</span><span>4.0 pass</span><span>5.0 fail</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-6 mt-5 rounded-xl border border-border bg-[var(--muted)] p-4 text-xs leading-relaxed text-[var(--muted-ink)] sm:mx-8">
        <b className="text-[var(--ink)]">Estimate only.</b> This uses the standard Modified Bavarian Formula. Your{" "}
        <b className="text-[var(--ink)]">official</b> German grade is set by uni-assist or the university, and the pass mark they apply can differ.
        Always confirm before applying.
      </p>

      {/* Result-aware CTA */}
      <div className="m-6 text-center sm:m-8">
        <p className="text-[0.98rem] text-[var(--ink-2)]">
          {result.state === "ok" ? (
            <>
              <b className="text-[var(--navy-900)]">{result.display} is a {result.band.en.toLowerCase()} grade.</b> Which German universities
              actually accept it?
            </>
          ) : (
            <>Your grade is step one. <b className="text-[var(--navy-900)]">Which German universities actually accept it?</b></>
          )}
        </p>
        <a
          href="/#contact"
          onClick={() => track("converter_cta_click", result.state === "ok" ? { german_grade: result.display } : undefined)}
          className="btn-gold mt-4 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.98rem] transition"
        >
          Get a free profile assessment →
        </a>
      </div>
    </div>
  );
}
