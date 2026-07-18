import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/lead.functions";

// Self-hosted so the video works on any deploy target (Lovable asset URLs only resolve on Lovable infra).
// Desktop gets the full-quality original; phones get a 720p encode (~1 MB) chosen at mount.
const HERO_VIDEO = "/hero-video.mp4";
const HERO_VIDEO_MOBILE = "/hero-video-mobile.mp4";
const HERO_POSTER = "/hero-poster.jpg";

/** Fire a GA4 event; no-op when gtag not loaded. */
function track(event: string, params?: Record<string, string>) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}

const GUIDE_PAGES = [
  { title: "APS Certificate Guide", href: "/guides/aps-certificate" },
  { title: "Blocked Account Guide", href: "/guides/blocked-account" },
  { title: "Uni-assist Guide", href: "/guides/uni-assist" },
  { title: "Student Visa Guide", href: "/guides/student-visa" },
  { title: "Work Student Guide", href: "/guides/work-student" },
  { title: "Application Timeline", href: "/guides/application-timeline" },
];

const FAQS = [
  { q: "How much does it cost to study in Germany as an Indian student?", a: "Most public universities charge €0 tuition, only a semester fee of €150–€350. Living costs run about €850–€1,100/month depending on the city. A blocked account of €11,904/year is required for your student visa." },
  { q: "How long does the whole process take?", a: "Plan for 8–12 months end-to-end: APS (2–3 months), applications (3–4 months), admission decision (1–2 months), blocked account & visa (4–8 weeks)." },
  { q: "What is APS and do I need it?", a: "APS is a certificate that verifies your Indian academic documents. Yes, every Indian student needs it before a German student visa. We guide the full APS: documents, form, interview, timing." },
  { q: "Can I work while studying?", a: "Yes. As a student you can work 140 full days or 280 half days a year. A Werkstudent (work-student) role is the goldilocks path, up to 20 hrs/week in-term, full time in break, industry-relevant." },
  { q: "Do I need to know German?", a: "For English-taught Master's, no. For Werkstudent roles and staying on after graduation, B1–B2 German helps enormously. We suggest starting A1 alongside your applications." },
  { q: "What does Sieg Counselling actually charge?", a: "The first call is free. Package pricing depends on how much of the journey you want handled. We tell you honestly what you can DIY and what's worth support." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const CONTACT = {
  phone: "+918806221060",
  phoneDisplay: "+91 88062 21060",
  email: "info@siegcounselling.com",
  instagram: "https://www.instagram.com/siegcounsellingservices/",
  linkedin: "https://www.linkedin.com/company/136126364/",
  facebook: "https://www.facebook.com/profile.php?id=61591777750073",
  whatsapp: "https://wa.me/918806221060",
};

const universities = [
  "TU Munich",
  "RWTH Aachen",
  "TU Berlin",
  "Heidelberg University",
  "LMU Munich",
  "KIT Karlsruhe",
  "TU Dresden",
  "University of Stuttgart",
  "TU Darmstadt",
  "Humboldt University Berlin",
  "University of Freiburg",
  "University of Bonn",
  "TU Hamburg",
  "University of Cologne",
  "Leibniz Hannover",
  "University of Göttingen",
];

const steps = [
  { n: "01", tag: "Start", title: "Profile evaluation", body: "An honest read on your grades, gaps and goals." },
  { n: "02", tag: "Shortlist", title: "University selection", body: "Public universities first, TU9 where it fits." },
  { n: "03", tag: "Story", title: "SOP & LOR", body: "A statement that reads like a person, not a template." },
  { n: "04", tag: "Submit", title: "Applications", body: "Uni-assist, deadlines, documents, done right." },
  { n: "05", tag: "Verify", title: "APS certificate", body: "The step most people underestimate." },
  { n: "06", tag: "Finance", title: "Blocked account", body: "Right provider, right amount, right timing." },
  { n: "07", tag: "Approval", title: "Student visa", body: "Documents and interview prep that clears." },
  { n: "08", tag: "Home", title: "Accommodation", body: "A real room, no deposit lost to scams." },
  { n: "09", tag: "Land", title: "Arrival & Anmeldung", body: "SIM, bank, insurance, registration, in order." },
  { n: "10", tag: "Stay", title: "Residence permit", body: "From visa to residence permit, calmly." },
  { n: "11", tag: "Grow", title: "Work & career", body: "Work Student, internships, staying after study." },
];

const testimonials: {
  name: string;
  course: string;
  text: string;
  initial?: string;
  photo?: string;
}[] = [
  {
    name: "Devika Ashok",
    course: "Admitted · Universität Trier",
    text: "I sincerely thank you for all the help and guidance you provided during my university application process. Your support, whether through advice, encouragement, or practical assistance, made a huge difference. I appreciate the time and effort you dedicated to ensuring I made the best choices for my future. I'm excited to begin this new journey, and I couldn't have done it without your support. Thank you once again!",
    photo: "/students/devika-ashok.jpg",
  },
  {
    name: "Abhay Borse",
    course: "Study in Germany",
    text: "One of the best consultancies for students who wish to pursue education in Germany. I had a fantastic experience working with them, as they provided comprehensive support at every step, from IELTS and APS to university applications and visa appointments. Moreover, in comparison to other consultancies, Sieg is highly cost-effective. I highly recommend Sieg to everyone seeking a seamless educational journey.",
    photo: "/students/abhay-borse.jpg",
  },
];

const guides = [
  { key: "blueprint", title: "The Germany Blueprint", desc: "The full roadmap, in the order it happens.", file: "/guides/01-The-Germany-Blueprint.pdf" },
  { key: "aps", title: "APS, De-confused", desc: "What to prepare, and the slips that cost weeks.", file: "/guides/02-APS-De-confused.pdf" },
  { key: "visa", title: "Blocked Account & Visa Pack", desc: "Providers, amounts and timing for a clean file.", file: "/guides/03-Blocked-Account-Visa-Pack.pdf" },
  { key: "unis", title: "Public University Starter List", desc: "Where to start looking, by field and city.", file: "/guides/04-Public-University-Starter-List.pdf" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Home() {
  useReveal();
  const [showEnd, setShowEnd] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Pick the right file for the screen: phones load the 1 MB 720p encode, desktop the full-quality original.
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    v.src = isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO;
    v.play().catch(() => {});
    const onTime = () => {
      if (v.duration && v.currentTime >= v.duration - 3.2) setShowEnd(true);
      else setShowEnd(false);
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO with video */}
      <section className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
        <SocialRail />
        <div className="relative w-full" style={{ minHeight: "min(92vh, 820px)" }}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0.05_260/0.65)] via-[oklch(0.14_0.05_260/0.35)] to-[oklch(0.14_0.05_260/0.85)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.05_260/0.7)] via-transparent to-transparent" />

          {/* End-of-video branded reveal */}
          {showEnd && (
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-6 text-center animate-outro-bg"
              style={{ background: "linear-gradient(160deg, oklch(0.16 0.05 260 / 0.94), oklch(0.22 0.08 280 / 0.92))" }}
            >
              <div className="outro-sheen absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-center gap-3">
                  <span className="h-px w-10 origin-right bg-[var(--gold)] animate-outro-line" style={{ animationDelay: "0.15s" }} />
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-[var(--gold-soft)] animate-outro-rise" style={{ animationDelay: "0.25s" }}>
                    Study in Germany · Guided right
                  </span>
                  <span className="h-px w-10 origin-left bg-[var(--gold)] animate-outro-line" style={{ animationDelay: "0.15s" }} />
                </div>
                <div className="mb-6 flex items-center justify-center animate-outro-logo" style={{ animationDelay: "0.05s" }}>
                  <SiegLogo size={72} tone="light" />
                </div>
                <div className="text-balance font-heading text-[clamp(2.4rem,6.4vw,5.2rem)] leading-[1.02] tracking-tight" role="presentation">
                  <span className="block text-white animate-outro-rise" style={{ animationDelay: "0.45s" }}>Sieg Counselling</span>
                  <span className="block bg-clip-text text-transparent animate-outro-rise" style={{ backgroundImage: "var(--gradient-gold)", animationDelay: "0.65s" }}>
                    Services
                  </span>
                </div>
                <p className="mx-auto mt-6 max-w-[46ch] text-balance text-lg text-white/80 animate-outro-rise" style={{ animationDelay: "0.95s" }}>
                  Your Germany plan, guided by people who have already walked every step.
                </p>
                <div className="mx-auto mt-7 h-px w-24 bg-[var(--gold)] animate-outro-line" style={{ animationDelay: "1.2s" }} />
              </div>
            </div>
          )}

          {/* Hero content */}
          <div
            className={`relative z-10 mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-end px-6 pb-20 pt-40 transition-opacity duration-700 md:pt-48 ${
              showEnd ? "opacity-0" : "opacity-100"
            }`}
            style={{ minHeight: "min(92vh, 820px)" }}
          >
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-soft)]">
                <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" />
                A team that lives in Germany · Guides from India
              </span>
              <h1 className="mt-5 text-balance text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.05] tracking-tight text-white">
                Study in Germany, guided by a team that <em className="italic text-[var(--gold-soft)]">actually lives here.</em>
              </h1>
              <p className="mt-5 max-w-[58ch] text-[1.05rem] text-white/80">
                One-to-one guidance, not a call centre. From university shortlist to your first winter here: the honest path, without the sales pitch.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.98rem] transition">
                  <CalendarIcon /> Book a free call
                </a>
                <a href="#score" className="btn-outline-light inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.98rem] transition">
                  <StarIcon /> Check my Sieg Score
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-2"><Check /> Master's completed in Germany</span>
                <span className="inline-flex items-center gap-2"><Check /> One-to-one, every time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-[var(--muted)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {[
            { k: "In Germany", v: "Team living & working here" },
            { k: "Master's", v: "Earned at a German university" },
            { k: "Insider", v: "A working career here, not theory" },
            { k: "1-to-1", v: "You talk to the team, every time" },
          ].map((t) => (
            <div key={t.k} className="reveal">
              <div className="font-heading text-2xl text-[var(--navy-900)]">{t.k}</div>
              <div className="mt-1 text-sm text-[var(--muted-ink)]">{t.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Universities marquee */}
      <section className="overflow-hidden bg-[var(--navy-950)] py-14 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-soft)]">
                <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Top universities
              </span>
              <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">
                Where our students land, from TU9 to Germany's finest publics.
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="max-w-sm text-sm text-white/60">
                A rolling snapshot of the universities we regularly place students into.
              </p>
              <button
                type="button"
                onClick={() => setMarqueePaused((p) => !p)}
                aria-pressed={marqueePaused}
                aria-label={marqueePaused ? "Play university list animation" : "Pause university list animation"}
                className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
              >
                {marqueePaused ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--navy-950)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--navy-950)] to-transparent" />
          <div className="flex w-max animate-marquee gap-4 py-4" style={{ animationPlayState: marqueePaused ? "paused" : "running" }}>
            {[...universities, ...universities].map((u, i) => (
              <div
                key={i}
                className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm text-white/85 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="bg-[var(--muted)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-2)]">
              <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> The path
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl text-[var(--navy-900)]">
              11 steps. India to a life in Germany.
            </h2>
            <p className="mt-4 max-w-xl text-[var(--muted-ink)]">
              A quick map. The <a href="#contact" className="text-[var(--navy-700)] underline underline-offset-4">free guide</a> covers each step in full.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="reveal group relative rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-heading text-3xl text-[var(--navy-800)]">{s.n}</span>
                  <span className="rounded-full bg-[var(--muted)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-[var(--navy-700)]">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-xl text-[var(--navy-900)]">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted-ink)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Germany */}
      <section className="bg-[var(--navy-900)] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl reveal">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-soft)]">
              <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Why Germany
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl text-balance">A world-class degree, minus the debt that follows you home.</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "€0", d: "Tuition at most public universities, small semester fee only" },
              { n: "18 mo", d: "To look for work in Germany after graduation" },
              { n: "TU9", d: "Elite engineering & tech schools known worldwide" },
              { n: "EU", d: "A qualification that travels across Europe" },
            ].map((f, i) => (
              <div key={i} className="reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="font-heading text-4xl text-[var(--gold-soft)]">{f.n}</div>
                <div className="mt-2 text-sm text-white/70">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-2)]">
              <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Where we come in
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl text-[var(--navy-900)]">Pick the part you're stuck on. That's where we start.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Profile & university fit", d: "A shortlist matched to your marks, budget and target intake, publics first.", icon: <CompassIcon /> },
              { t: "Applications, SOP & APS", d: "A statement that stands out and APS handled step by step.", icon: <FileTextIcon /> },
              { t: "Uni-Assist Support", d: "VPD, document uploads and deadlines on Uni-assist, filed correctly the first time.", icon: <SendIcon /> },
              { t: "Blocked account & visa", d: "Finances and paperwork made visa-ready, plus real interview prep.", icon: <ShieldCheckIcon /> },
              { t: "Accommodation & arrival", d: "A legitimate room, scams to dodge, first-week Anmeldung plan.", icon: <HomeIcon /> },
              { t: "Insurance & the boring setup", d: "Cover, bank account, SIM, registration, the stuff nobody explains.", icon: <GearIcon /> },
              { t: "Work Student Guidance", d: "Finding Work Student roles, contracts, hour limits, and balancing them with study.", icon: <BriefcaseIcon /> },
              { t: "Jobs & staying on", d: "Internships, first jobs, and building a career in Germany after the degree.", icon: <TrendUpIcon /> },
            ].map((c, i) => (
              <article
                key={c.t}
                className="reveal group rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--navy-950)] text-[var(--gold-soft)]">
                  {c.icon}
                </div>
                <h3 className="text-xl text-[var(--navy-900)]">{c.t}</h3>
                <p className="mt-2 text-[0.95rem] text-[var(--muted-ink)]">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="bg-[var(--muted)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-2)]">
              <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Real students
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl text-[var(--navy-900)]">A few of the people already on their way.</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="reveal relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute -inset-3 -z-10 rounded-2xl border-2 border-[var(--gold)]/40 translate-x-4 translate-y-4" aria-hidden="true" />
              <img
                src="/founder/sagar-patil.jpg"
                alt="Sagar S. Patil, founder of Sieg Counselling Services"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-md)]"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-[var(--navy-950)]/85 px-4 py-2.5 backdrop-blur">
                <div className="font-semibold text-white">Sagar S. Patil</div>
                <div className="text-xs text-[var(--gold-soft)]">Founder · Sieg Counselling Services</div>
              </div>
            </div>

            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-2)]">
                <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Who you'll talk to
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl text-[var(--navy-900)]">
                Hi, I'm Sagar. I made this move myself.
              </h2>
              <p className="mt-6 text-[1.02rem] leading-relaxed text-[var(--ink-2)]">
                In 2019 I left India for my Master's in Germany. Environmental &amp; Resource Management. Every step
                your family is about to research, I've done personally: APS, Uni-assist, the blocked account, the visa
                interview, the first apartment, the first German winter.
              </p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-[var(--ink-2)]">
                Sieg exists because I remember how confusing it was to figure this out alone, and how much bad,
                overpriced advice is out there. So when we work together, you get the honest version: what's worth
                paying for, what you can do yourself, and which mistakes quietly cost people months.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {[
                  "MSc Environmental & Resource Management",
                  "Living in Germany since 2019",
                  "One-to-one with every student",
                ].map((chip) => (
                  <span key={chip} className="rounded-full border border-border bg-[var(--muted)] px-4 py-1.5 text-sm font-medium text-[var(--navy-800)]">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.98rem] transition">
                  <CalendarIcon /> Book a free call
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="btn-outline-dark inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.98rem] transition">
                  <LinkedInIcon /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free guides + form */}
      <section id="contact" className="bg-[var(--navy-900)] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-soft)]">
                <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Free guides
              </span>
              <h2 className="mt-3 text-balance text-4xl md:text-5xl">Grab a guide now. Talk to us when you're ready.</h2>
              <p className="mt-4 max-w-xl text-white/70">
                Each guide is a complete, no-fluff PDF written from experience. Pick the one for where you are, we'll send it and follow up personally.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {guides.map((g) => (
                  <a
                    key={g.key}
                    href={g.file}
                    download
                    onClick={() => track("guide_download", { guide: g.title })}
                    className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-[var(--gold-soft)] hover:bg-white/[0.07]"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-lg" style={{ background: "var(--gradient-gold)", color: "var(--navy-950)" }}>
                      <DownloadIcon />
                    </span>
                    <span className="flex-1">
                      <span className="block font-heading text-lg text-white">{g.title}</span>
                      <span className="mt-1 block text-sm text-white/60">{g.desc}</span>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--gold-soft)]/50 px-3.5 py-1 text-xs font-semibold text-[var(--gold-soft)] transition group-hover:border-transparent group-hover:bg-[var(--gold)] group-hover:text-[var(--navy-950)]">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>
                        Download PDF
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--gold-2)]">
              <span className="inline-block h-[2px] w-6 bg-[var(--gold)]" /> Answers
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl text-[var(--navy-900)]">
              The questions people ask us first.
            </h2>
          </div>
          <FAQAccordion />
          <div className="reveal mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-ink)]">Deep-dive guides</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {GUIDE_PAGES.map((gp) => (
                <a
                  key={gp.href}
                  href={gp.href}
                  className="flex items-center justify-between rounded-xl border border-border bg-white px-5 py-3.5 text-sm font-medium text-[var(--navy-800)] shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:text-[var(--gold-2)]"
                >
                  {gp.title}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="score" className="relative overflow-hidden py-24 text-center text-white" style={{ background: "var(--gradient-final)" }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-4xl md:text-5xl reveal">One honest call is where your Germany plan starts.</h2>
          <p className="mt-5 text-white/75 reveal">
            Nothing to pay to talk. No scripts. Just a conversation with a team already living the life you're planning.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 reveal">
            <a href="#contact" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5">
              <CalendarIcon /> Book a free call
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click")} className="btn-outline-light inline-flex items-center gap-2 rounded-full px-7 py-3.5">
              <WhatsAppIcon /> Message the team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- FAQ Accordion ---------- */

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = FAQS;

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)] overflow-hidden">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3 className="font-sans">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-[var(--muted)]"
              >
                <span className="font-sans font-semibold tracking-normal text-[var(--navy-900)] leading-snug">{faq.q}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`flex-none text-[var(--gold-2)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Testimonial carousel ---------- */

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const count = testimonials.length;

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 3800);
    return () => clearInterval(t);
  }, [paused, count]);

  const go = (i: number) => setIndex(((i % count) + count) % count);

  return (
    <div
      className="reveal relative mx-auto max-w-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Student testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        className="overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => { dragStartX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (dragStartX.current === null) return;
          const delta = e.clientX - dragStartX.current;
          dragStartX.current = null;
          if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
        }}
        onPointerCancel={() => { dragStartX.current = null; }}
      >
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)`, transitionTimingFunction: "var(--ease)" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="w-full flex-none px-1 sm:px-2"
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-sm)] sm:p-9">
                <div className="text-[var(--gold-2)]" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-[var(--ink-2)]">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={`Photo of ${t.name}`}
                      className="h-12 w-12 flex-none rounded-full object-cover ring-2 ring-[var(--gold)]"
                      loading="lazy"
                    />
                  ) : (
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-full font-heading text-lg" style={{ background: "var(--gradient-gold)", color: "var(--navy-950)" }}>
                      {t.initial}
                    </span>
                  )}
                  <div className="text-sm">
                    <div className="font-semibold text-[var(--navy-900)]">{t.name}</div>
                    <div className="text-[var(--muted-ink)]">{t.course}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous testimonial"
        className="absolute -left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-[var(--navy-800)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--gold)] hover:text-[var(--navy-950)] sm:-left-5"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5-7 7 7 7"/></svg>
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next testimonial"
        className="absolute -right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-[var(--navy-800)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--gold)] hover:text-[var(--navy-950)] sm:-right-5"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7"/></svg>
      </button>

      <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Choose testimonial">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-[var(--gold-2)]" : "w-2.5 bg-[var(--navy-900)]/20 hover:bg-[var(--navy-900)]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Lead form ---------- */

function LeadForm() {
  const submit = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  return (
    <form
      className="reveal relative rounded-2xl bg-white p-8 text-[var(--ink)] shadow-[var(--shadow-lg)]"
      onSubmit={async (e) => {
        e.preventDefault();
        if (status === "sending") return;
        const fd = new FormData(e.currentTarget);
        setStatus("sending");
        setError("");
        track("book_now");
        try {
          await submit({
            data: {
              name: String(fd.get("name") ?? ""),
              email: String(fd.get("email") ?? ""),
              whatsapp: String(fd.get("wa") ?? ""),
              stage: String(fd.get("stage") ?? ""),
              message: String(fd.get("message") ?? ""),
              company: String(fd.get("company") ?? ""),
            },
          });
          setStatus("sent");
          track("consultation_submit");
        } catch (err) {
          console.error(err);
          setError("Something went wrong. Please email us at " + CONTACT.email);
          setStatus("error");
        }
      }}
    >
      <h3 className="font-heading text-2xl text-[var(--navy-900)]">Book your free call</h3>
      <p className="mt-1 text-sm text-[var(--muted-ink)]">We reply personally, usually within a day.</p>
      {/* Honeypot, hidden from humans, catches bots */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="mt-6 grid gap-4">
        <Field label="Full name" name="name" type="text" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
        <Field
          label="WhatsApp number"
          name="wa"
          type="tel"
          placeholder="+91 98765 43210"
          required
          hint="This is how we'll reach you to set up the call."
        />
        <div>
          <label htmlFor="stage" className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">Where are you right now?</label>
          <div className="relative">
            <select
              id="stage"
              name="stage"
              defaultValue="Just exploring Germany"
              className="w-full appearance-none rounded-lg border border-border bg-white py-3 pl-4 pr-11 text-sm outline-none transition focus:border-[var(--navy-700)] focus:ring-2 focus:ring-[var(--navy-700)]/20"
            >
              <option>Just exploring Germany</option>
              <option>Choosing universities / courses</option>
              <option>Applications & APS</option>
              <option>Blocked account & visa</option>
              <option>Accommodation & arrival</option>
              <option>Already in Germany</option>
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
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">Anything we should know? (optional)</label>
          <textarea id="message" name="message" rows={3} className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--navy-700)] focus:ring-2 focus:ring-[var(--navy-700)]/20" placeholder="Background, goals, worries…" />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="btn-gold mt-6 w-full rounded-full py-3.5 text-[0.98rem] transition disabled:opacity-70"
      >
        {status === "sending" ? "Booking…" : status === "sent" ? "Booked, we'll be in touch ✓" : "Book Now"}
      </button>
      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-xs text-red-600">{error}</p>
      )}
      {status === "sent" ? (
        <div role="status" className="mt-5 rounded-xl border border-border bg-[var(--muted)] p-4">
          <p className="text-sm font-semibold text-[var(--navy-900)]">Your guides are ready 🎉</p>
          <p className="mt-1 text-xs text-[var(--muted-ink)]">
            Download them now, we've also sent them to your email.
          </p>
          <div className="mt-3 grid gap-2">
            {guides.map((g) => (
              <a
                key={g.key}
                href={g.file}
                download
                onClick={() => track("guide_download", { guide: g.title })}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm font-medium text-[var(--navy-900)] transition hover:border-[var(--gold-2)] hover:text-[var(--gold-2)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>
                {g.title}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-center text-xs text-[var(--muted-ink)]">
          No spam, no drip sequence. Just a reply from the team. By booking you agree to our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-[var(--navy-700)]">privacy policy</a>.
        </p>
      )}
    </form>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-white/90 shadow-[var(--shadow-sm)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className={`flex items-center gap-2.5 ${scrolled ? "text-[var(--navy-900)]" : "text-white"}`}>
          <SiegLogo size={36} tone={scrolled ? "dark" : "light"} />
          <span className="font-heading text-[1.05rem] leading-none">
            <b className="font-semibold tracking-tight">Sieg</b>
            <span className="ml-1 opacity-70">Counselling</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Roadmap", "#roadmap"],
            ["Services", "#services"],
            ["Stories", "#stories"],
            ["About", "#founder"],
            ["Guides", "#contact"],
          ].map(([l, h]) => (
            <a key={l} href={h} className={`text-sm font-medium transition ${scrolled ? "text-[var(--ink-2)] hover:text-[var(--navy-700)]" : "text-white/85 hover:text-white"}`}>
              {l}
            </a>
          ))}
          <a href="#contact" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm">
            Book a free call
          </a>
        </nav>
        <button className={`md:hidden ${scrolled ? "text-[var(--navy-900)]" : "text-white"}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white shadow-[var(--shadow-md)] md:hidden">
          <div className="flex flex-col p-2">
            {[["Roadmap","#roadmap"],["Services","#services"],["Stories","#stories"],["About","#founder"],["Guides","#contact"]].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="border-b border-border px-4 py-3 text-sm text-[var(--ink-2)]">{l}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-gold mx-4 my-3 rounded-full px-5 py-2.5 text-center text-sm">Book a free call</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Vertical social rail ---------- */

function SocialRail() {
  const items = [
    { label: "Instagram", href: CONTACT.instagram, icon: <InstagramIcon /> },
    { label: "LinkedIn", href: CONTACT.linkedin, icon: <LinkedInIcon /> },
    { label: "Facebook", href: CONTACT.facebook, icon: <FacebookIcon /> },
    { label: "WhatsApp", href: CONTACT.whatsapp, icon: <WhatsAppIcon /> },
    { label: "Email", href: `mailto:${CONTACT.email}`, icon: <MailIcon /> },
  ];
  return (
    <>
      {/* Desktop: left rail, scoped to the hero section */}
      <div className="pointer-events-none absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <ul className="pointer-events-auto flex flex-col items-center gap-2 rounded-full border border-white/15 bg-[var(--navy-950)]/70 p-2 shadow-[var(--shadow-md)] backdrop-blur">
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={it.label}
                onClick={it.label === "WhatsApp" ? () => track("whatsapp_click") : undefined}
                className="group grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-[var(--gold)] hover:text-[var(--navy-950)]"
              >
                {it.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile: bottom bar, scoped to the hero section */}
      <div className="absolute inset-x-3 bottom-3 z-30 lg:hidden">
        <ul className="mx-auto flex max-w-sm items-center justify-around rounded-full border border-white/15 bg-[var(--navy-950)]/85 px-2 py-1.5 shadow-[var(--shadow-md)] backdrop-blur">
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={it.label}
                onClick={it.label === "WhatsApp" ? () => track("whatsapp_click") : undefined}
                className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition hover:bg-[var(--gold)] hover:text-[var(--navy-950)]"
              >
                {it.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-[var(--navy-950)] py-16 text-white/70">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main footer grid */}
        <div className="grid gap-16 md:grid-cols-4 mb-12">
          {/* Left: Branding */}
          <div>
            <div className="flex items-center gap-2.5 font-heading text-lg text-white">
              <SiegLogo size={40} tone="light" />
              <span>Sieg Counselling Services</span>
            </div>
            <p className="mt-4 max-w-sm text-sm">
              Personal, first-hand guidance for Indian students heading to Germany, from a team already living every step of it.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { l: "Instagram", h: CONTACT.instagram, i: <InstagramIcon /> },
                { l: "LinkedIn", h: CONTACT.linkedin, i: <LinkedInIcon /> },
                { l: "Facebook", h: CONTACT.facebook, i: <FacebookIcon /> },
                { l: "WhatsApp", h: CONTACT.whatsapp, i: <WhatsAppIcon /> },
                { l: "Email", h: `mailto:${CONTACT.email}`, i: <MailIcon /> },
              ].map((s) => (
                <a key={s.l} href={s.h} target={s.h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.l}
                   className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:bg-[var(--gold)] hover:text-[var(--navy-950)]">
                  {s.i}
                </a>
              ))}
            </div>
          </div>

          {/* Center: Explore */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#roadmap" className="transition hover:text-white">Roadmap</a></li>
              <li><a href="#services" className="transition hover:text-white">Services</a></li>
              <li><a href="#stories" className="transition hover:text-white">Stories</a></li>
              <li><a href="#contact" className="transition hover:text-white">Guides</a></li>
              <li><a href="#faq" className="transition hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Free guides</h4>
            <ul className="space-y-2.5 text-sm">
              {GUIDE_PAGES.map((gp) => (
                <li key={gp.href}><a href={gp.href} className="transition hover:text-white">{gp.title}</a></li>
              ))}
            </ul>
          </div>

          {/* Right: Reach us */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Reach us</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click")} className="transition hover:text-white">WhatsApp {CONTACT.phoneDisplay}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">{CONTACT.email}</a></li>
              <li><a href="#contact" className="transition hover:text-white">Book a call</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright + Legal */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-white/50">
            <span>© {new Date().getFullYear()} Sieg Counselling Services · Guidance from lived experience.</span>
            <div className="flex gap-4">
              <a href="/privacy" className="transition hover:text-white">Privacy</a>
              <a href="/terms" className="transition hover:text-white">Terms</a>
              <a href="/imprint" className="transition hover:text-white">Imprint</a>
            </div>
            <span className="text-white/40">Independent, not affiliated with any university or government body.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Field({ label, name, type, placeholder, required, hint }: { label: string; name: string; type: string; placeholder?: string; required?: boolean; hint?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">{label}</label>
      <input
        id={name}
        aria-describedby={hint ? `${name}-hint` : undefined}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        inputMode={type === "tel" ? "tel" : undefined}
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--navy-700)] focus:ring-2 focus:ring-[var(--navy-700)]/20"
      />
      {hint && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-[var(--muted-ink)]">{hint}</p>
      )}
    </div>
  );
}

/* ---------- Logo ---------- */

function SiegLogo({ size = 40, tone = "dark" }: { size?: number; tone?: "light" | "dark" }) {
  return (
    <img
      src={tone === "light" ? "/brand/falcon-light.png" : "/brand/falcon-dark.png"}
      alt="Sieg Counselling Services, falcon over the bridge logo"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain" }}
      draggable={false}
    />
  );
}

/* ---------- Icons ---------- */
const CalendarIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);
const StarIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="m12 2 2.6 6.4L21 9l-5 4.3L17.5 20 12 16.6 6.5 20 8 13.3 3 9l6.4-.6z"/></svg>);
const Check = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5"/></svg>);
const DownloadIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>);
const WhatsAppIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.07-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.2-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.13 4.54.72.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.8-.74 2.05-1.45.25-.72.25-1.33.18-1.46-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z"/></svg>);
const CompassIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>);
const FileTextIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V8.5z"/><path d="M14 3v5.5h5.5M8.5 12.5h7M8.5 16h7"/></svg>);
const SendIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8z"/></svg>);
const ShieldCheckIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v5.5c0 4.2 2.9 7.4 7 9.5 4.1-2.1 7-5.3 7-9.5V6z"/><path d="m9 12 2 2 4-4.5"/></svg>);
const HomeIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 10.5 8.5-7 8.5 7"/><path d="M5.5 9v10.5h13V9"/><path d="M10 19.5v-5h4v5"/></svg>);
const GearIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M21.2 12h-3M5.8 12h-3M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1M18.5 18.5l-2.1-2.1M7.6 7.6 5.5 5.5"/></svg>);
const BriefcaseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M8.5 7.5V5.8A1.8 1.8 0 0 1 10.3 4h3.4a1.8 1.8 0 0 1 1.8 1.8v1.7M3 12.5h18"/></svg>);
const TrendUpIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 17.5 5.5-5.5 3.5 3.5 7.5-8"/><path d="M15 7.5h5V12"/></svg>);
const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>);
const LinkedInIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.9 1.28-1.9 2.6V21h-4z"/></svg>);
const FacebookIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.56 1.6-1.56h1.7V4.3c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.3v2.4H7V14h3.12v8z"/></svg>);
const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>);
