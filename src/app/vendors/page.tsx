import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const whyExhibitPoints = [
  "Reach passionate snowmobile customers",
  "Showcase new products and services",
  "Connect with riders before the winter season begins",
  "Build brand awareness in the Rocky Mountain Region",
];

export const metadata = {
  title: "Become a Vendor | Colorado Snomo Expo",
  description: "Vendor registration for Colorado Snomo Expo.",
};

export default function VendorsPage() {
  return (
    <main className="vendors-page">
      <SiteHeader />

      <section className="vendors-registration" aria-labelledby="vendor-registration-title">
        <div>
          <h1 id="vendor-registration-title">Ready to Become a Vendor?</h1>
          <p>
            Vendor registration is handled through our official Colorado Snomo
            Expo registration form.
          </p>
        </div>

        <div className="vendors-registration-actions">
          <Link
            className="button button-primary"
            href="https://www.jotform.com/build/261379354993068"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register as a Vendor
          </Link>
          <Link
            className="button vendors-terms-link"
            href="/documents/vendor-terms-and-conditions.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Review Vendor Terms &amp; Conditions
          </Link>
        </div>
      </section>

      <section className="vendors-section" aria-labelledby="why-exhibit-title">
        <div className="vendors-section-heading">
          <p className="vendors-kicker">Why Exhibit</p>
          <h2 id="why-exhibit-title">Meet the Right Customers Before Winter Begins</h2>
        </div>

        <div className="vendors-list">
          {whyExhibitPoints.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
