import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalH2 } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Sieg Counselling Services" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="17 July 2026">
      <p>
        Sieg Counselling Services ("we", "us") helps Indian students plan their studies in Germany. We keep data
        collection to the minimum needed to reply to you and guide you. This page explains what we collect, why,
        and your rights.
      </p>

      <LegalH2>What we collect</LegalH2>
      <p>
        When you book a free call or request our guides, we collect the details you enter in the form: your name,
        email address, WhatsApp number, the stage of your Germany plan, and any message you choose to add.
      </p>

      <LegalH2>Analytics</LegalH2>
      <p>
        We use Google Analytics 4 to understand how visitors use this site (pages viewed, buttons clicked). Google
        Analytics sets cookies and processes usage data under Google's privacy terms. We use this data only in
        aggregate, to improve the site, and we do not use it for advertising. You can block analytics cookies in
        your browser without affecting the site.
      </p>

      <LegalH2>Why we collect it</LegalH2>
      <p>
        We use your details for one purpose: to respond to your enquiry, including contacting you on WhatsApp or
        email to arrange your call and sending you the guides you requested. We process this data on the basis of
        your consent, which you give by submitting the form. We do not sell your data or use it for third-party
        advertising.
      </p>

      <LegalH2>Where your data is stored</LegalH2>
      <p>
        Form submissions are stored in a spreadsheet operated by us on Google Workspace (Google Ireland Ltd.).
        Emails to you are delivered via Resend (EU region infrastructure). If we message you on WhatsApp, that
        conversation is handled by WhatsApp/Meta under their own terms. Our website is hosted by our hosting
        provider, which may process technical data (such as IP addresses) in server logs.
      </p>

      <LegalH2>How long we keep it</LegalH2>
      <p>
        We keep your enquiry details for as long as needed to support you, and delete them on request at any time.
      </p>

      <LegalH2>Your rights</LegalH2>
      <p>
        Under the GDPR you can ask us at any time to access, correct, or delete the personal data we hold about
        you, or to withdraw your consent. Email{" "}
        <a href="mailto:info@siegcounselling.com" className="underline underline-offset-2">info@siegcounselling.com</a>{" "}
        and we will act on it promptly. You also have the right to lodge a complaint with a data-protection
        authority.
      </p>

      <LegalH2>Contact</LegalH2>
      <p>
        Sieg Counselling Services · Email:{" "}
        <a href="mailto:info@siegcounselling.com" className="underline underline-offset-2">info@siegcounselling.com</a>{" "}
        · WhatsApp: +91 88062 21060
      </p>
    </LegalPage>
  );
}
