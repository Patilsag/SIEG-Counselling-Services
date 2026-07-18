import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalH2 } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Sieg Counselling Services" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="17 July 2026">
      <p>
        These terms describe how Sieg Counselling Services ("we", "us") works with you when you use this website,
        download our guides, or engage our counselling services.
      </p>

      <LegalH2>What we do</LegalH2>
      <p>
        We provide guidance and support for students planning to study in Germany, including profile evaluation,
        university shortlisting, applications, APS, blocked account and visa preparation, and arrival support. The
        first consultation call is free. Paid support, where you choose it, is agreed individually and in writing
        before any fee is due.
      </p>

      <LegalH2>What we can't promise</LegalH2>
      <p>
        Admission, visa, and scholarship decisions are made solely by universities, uni-assist, APS, banks, and
        German authorities, never by us. We prepare you honestly and thoroughly, but we cannot and do not
        guarantee any admission, visa approval, or specific outcome. Anyone who guarantees you a visa is not being
        honest with you.
      </p>

      <LegalH2>Your part</LegalH2>
      <p>
        Our guidance is only as good as the information you give us. You are responsible for providing accurate,
        complete, and truthful documents and details, and for meeting the deadlines of universities and
        authorities.
      </p>

      <LegalH2>Guides &amp; content</LegalH2>
      <p>
        Our free guides and website content are for your personal use. Please don't republish or resell them.
        They reflect our experience and research at the time of writing; official requirements (fees, blocked
        account amounts, visa rules) change, always confirm current figures with the official source before
        acting.
      </p>

      <LegalH2>Liability</LegalH2>
      <p>
        We are liable for intent and gross negligence as provided by law. For simple negligence we are liable only
        for breaches of essential contractual duties, limited to the foreseeable damage typical for this kind of
        service. Our guidance is practical experience-sharing, not legal or immigration advice in the regulated
        sense.
      </p>

      <LegalH2>Contact</LegalH2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:info@siegcounselling.com" className="underline underline-offset-2">info@siegcounselling.com</a>
      </p>
    </LegalPage>
  );
}
