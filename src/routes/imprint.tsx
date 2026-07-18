import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalH2 } from "@/components/LegalPage";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "Imprint | Sieg Counselling Services" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <LegalPage title="Imprint" updated="17 July 2026">
      <LegalH2>Service provider</LegalH2>
      <p>
        Sieg Counselling Services
        <br />
        Owner: Sagar S. Patil
        <br />
        India
      </p>

      <LegalH2>Contact</LegalH2>
      <p>
        Email:{" "}
        <a href="mailto:info@siegcounselling.com" className="underline underline-offset-2">info@siegcounselling.com</a>
        <br />
        WhatsApp: +91 88062 21060
        <br />
        Website: www.siegcounselling.com
      </p>

      <LegalH2>Responsible for content</LegalH2>
      <p>Sagar S. Patil, contact as above.</p>

      <LegalH2>Dispute resolution</LegalH2>
      <p>
        We are not obliged and not willing to participate in dispute-settlement proceedings before a consumer
        arbitration board.
      </p>

      <LegalH2>Independence note</LegalH2>
      <p>
        Sieg Counselling Services is an independent counselling service. We are not affiliated with, endorsed by,
        or acting on behalf of any university, uni-assist, APS, or any government body.
      </p>
    </LegalPage>
  );
}
