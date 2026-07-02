import { SiteHeader } from "@/components/site-header";
import { SponsorInquiryForm } from "@/components/sponsor-inquiry-form";

export const metadata = {
  title: "Sponsor Inquiry | Colorado Snomo Expo",
  description:
    "Tell us about your business and the sponsorship opportunities you're interested in.",
};

export default function SponsorInquiryPage() {
  return (
    <main className="sponsor-inquiry-page">
      <SiteHeader />

      <section className="sponsor-inquiry-page-header" aria-labelledby="sponsor-inquiry-title">
        <p className="sponsor-inquiry-kicker">Colorado Snomo Expo</p>
        <h1 id="sponsor-inquiry-title">Sponsor Inquiry</h1>
        <p>
          Tell us about your business and the sponsorship opportunities
          you&apos;re interested in.
        </p>
      </section>

      <section className="sponsor-inquiry-panel" aria-labelledby="sponsor-inquiry-form-title">
        <div>
          <p className="sponsor-inquiry-kicker">Sponsorship</p>
          <h2 id="sponsor-inquiry-form-title">Start the Conversation</h2>
          <p>
            Share a few details with the Colorado Snomo Expo team and we&apos;ll
            follow up to discuss the right opportunities for your business.
          </p>
        </div>

        <SponsorInquiryForm />
      </section>
    </main>
  );
}
