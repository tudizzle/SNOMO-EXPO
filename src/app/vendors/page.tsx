import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const whyExhibitPoints = [
  "Reach passionate snowmobile customers",
  "Showcase new products and services",
  "Connect with riders before the winter season begins",
  "Build brand awareness in the Rocky Mountain Region",
  "Drive booth traffic through the Expo experience",
  "Be part of the annual kickoff to winter",
];

const vendorOpportunities = [
  "Vendor booth space",
  "Product displays",
  "Dealer displays",
  "Manufacturer displays",
  "Apparel and accessories",
  "Performance parts",
  "Clubs and organizations",
  "Swap meet related businesses",
];

export const metadata = {
  title: "Become a Vendor | Colorado Snomo Expo",
  description:
    "Showcase your business at the Rocky Mountain Region's premier winter powersports event.",
};

export default function VendorsPage() {
  return (
    <main className="vendors-page">
      <SiteHeader />

      <section className="vendors-page-header" aria-labelledby="vendors-title">
        <p className="vendors-kicker">Colorado Snomo Expo</p>
        <h1 id="vendors-title">Become a Vendor</h1>
        <p>
          Showcase your business at the Rocky Mountain Region&apos;s premier
          winter powersports event.
        </p>
      </section>

      <section className="vendors-introduction" aria-label="Vendor introduction">
        <p>
          Colorado Snomo Expo brings together snowmobile riders, families,
          clubs, dealers, manufacturers and winter powersports enthusiasts from
          across the Rocky Mountain Region.
        </p>
      </section>

      <section className="vendors-section" aria-labelledby="why-exhibit-title">
        <div className="vendors-section-heading">
          <p className="vendors-kicker">Why Exhibit</p>
          <h2 id="why-exhibit-title">Meet Riders Before Winter Begins</h2>
        </div>

        <div className="vendors-list">
          {whyExhibitPoints.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
      </section>

      <section className="vendors-section" aria-labelledby="vendor-opportunities-title">
        <div className="vendors-section-heading">
          <p className="vendors-kicker">Vendor Opportunities</p>
          <h2 id="vendor-opportunities-title">Built for the Winter Powersports Industry</h2>
        </div>

        <div className="vendors-opportunity-grid">
          {vendorOpportunities.map((opportunity) => (
            <p key={opportunity}>{opportunity}</p>
          ))}
        </div>
      </section>

      <section className="vendors-registration" aria-labelledby="vendor-registration-title">
        <div>
          <p className="vendors-kicker">Registration</p>
          <h2 id="vendor-registration-title">Ready to Become a Vendor?</h2>
          <p>
            Vendor registration is handled through our official Colorado Snomo
            Expo registration form.
          </p>
        </div>

        <Link
          className="button button-primary"
          href="https://www.jotform.com/build/261379354993068"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register as a Vendor
        </Link>
      </section>
    </main>
  );
}
