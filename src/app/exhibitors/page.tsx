import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { placeholderExhibitors } from "@/data/exhibitors";

export const metadata = {
  title: "Exhibitors | Colorado Snomo Expo",
  description:
    "Explore the companies, manufacturers and brands that make Colorado Snomo Expo the Rocky Mountain Region's premier winter powersports event.",
};

export default function ExhibitorsPage() {
  return (
    <main className="exhibitors-page">
      <SiteHeader />

      <section className="exhibitors-page-header" aria-labelledby="exhibitors-title">
        <p className="exhibitors-kicker">Colorado Snomo Expo</p>
        <h1 id="exhibitors-title">Exhibitors</h1>
        <p>
          Explore the companies, manufacturers and brands that make Colorado
          Snomo Expo the Rocky Mountain Region&apos;s premier winter powersports
          event.
        </p>
      </section>

      <section className="exhibitors-notice" aria-labelledby="exhibitors-notice-title">
        <h2 id="exhibitors-notice-title">2026 Exhibitor List Coming Soon</h2>
        <div>
          <p>We are currently finalizing our 2026 exhibitor lineup.</p>
          <p>
            The exhibitor directory below reflects last year&apos;s exhibitors to
            give you an idea of the companies that participate in Colorado Snomo
            Expo.
          </p>
          <p>Please check back soon as exhibitors are confirmed and added.</p>
        </div>
      </section>

      <section className="exhibitors-directory" aria-labelledby="directory-title">
        <div className="exhibitors-directory-header">
          <div>
            <p className="exhibitors-kicker">Placeholder Directory</p>
            <h2 id="directory-title">2025 Exhibitors</h2>
          </div>
          <p>{placeholderExhibitors.length} exhibitors listed</p>
        </div>

        <div className="exhibitors-list" role="table" aria-label="2025 exhibitors">
          <div className="exhibitors-list-row exhibitors-list-heading" role="row">
            <span role="columnheader">Booth</span>
            <span role="columnheader">Company</span>
          </div>

          {placeholderExhibitors.map((exhibitor, index) => (
            <div
              className="exhibitors-list-row"
              role="row"
              key={`${exhibitor.booth}-${exhibitor.name}-${index}`}
            >
              <span className="exhibitor-booth" role="cell">
                {exhibitor.booth}
              </span>
              <span role="cell">{exhibitor.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="exhibitors-bottom-cta" aria-label="Become a vendor">
        <p>Interested in exhibiting at the 2026 Colorado Snomo Expo?</p>
        <Link className="button button-primary" href="/vendors">
          Become a Vendor
        </Link>
      </section>
    </main>
  );
}
