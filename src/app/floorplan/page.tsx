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
        <h2 id="floorplan-notice-title">Floorplan Version 1.0</h2>
        <p>
          This launch floorplan may be updated as final booth assignments are
          confirmed.
        </p>
      </section>

      <section className="floorplan-preview" aria-labelledby="floorplan-preview-title">
        <div className="floorplan-preview-header">
          <div>
            <p className="floorplan-kicker">Launch Layout</p>
            <h2 id="floorplan-preview-title">Expo Floorplan</h2>
            <p className="floorplan-preview-copy">
              Review the current booth layout for the Colorado SnoMo Expo. This
              Version 1.0 floorplan is provided for launch and may be updated as
              final booth assignments are confirmed.
            </p>
          </div>
        </div>

        <div className="floorplan-image-frame">
          <Image
            src="/images/floorplan/colorado-snomo-expo-redrawn-floorplan-v1.png"
            alt="Colorado Snomo Expo Version 1.0 floorplan with booth numbers and venue areas"
            width={1448}
            height={1086}
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
