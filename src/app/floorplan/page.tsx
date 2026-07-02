import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Floorplan | Colorado Snomo Expo",
  description:
    "Explore the Colorado Snomo Expo layout and get a preview of how exhibitors, vendors and event areas are organized.",
};

export default function FloorplanPage() {
  return (
    <main className="floorplan-page">
      <SiteHeader />

      <section className="floorplan-page-header" aria-labelledby="floorplan-title">
        <p className="floorplan-kicker">Colorado Snomo Expo</p>
        <h1 id="floorplan-title">Floorplan</h1>
        <p>
          Explore the Colorado Snomo Expo layout and get a preview of how
          exhibitors, vendors and event areas are organized.
        </p>
      </section>

      <section className="floorplan-notice" aria-labelledby="floorplan-notice-title">
        <h2 id="floorplan-notice-title">2026 Final Floorplan Coming Soon</h2>
        <p>
          We are currently finalizing the 2026 Colorado Snomo Expo floorplan.
          The layout below reflects the previous event floorplan and is provided
          as a reference for vendors and attendees. Please check back soon for
          the final 2026 booth layout and exhibitor assignments.
        </p>
      </section>

      <section className="floorplan-preview" aria-labelledby="floorplan-preview-title">
        <div className="floorplan-preview-header">
          <div>
            <p className="floorplan-kicker">Reference Layout</p>
            <h2 id="floorplan-preview-title">2025 Floorplan Reference</h2>
          </div>
          <p>Final 2026 Floorplan Coming Soon</p>
        </div>

        <div className="floorplan-image-frame">
          <Image
            src="/images/floorplan/2025-floorplan-reference.png"
            alt="2025 Colorado Snomo Expo floorplan reference with booth numbers and venue areas"
            width={1100}
            height={793}
            sizes="(max-width: 900px) 100vw, 1100px"
            priority
          />
        </div>

        <div className="floorplan-actions" aria-label="Floorplan actions">
          <Link className="button button-secondary" href="/exhibitors">
            View Exhibitors
          </Link>
          <Link className="button button-primary" href="/vendors">
            Become a Vendor
          </Link>
        </div>
      </section>
    </main>
  );
}
