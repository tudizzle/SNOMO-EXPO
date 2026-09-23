import { InteractiveFloorPlan } from "@/components/interactive-floor-plan";
import { SiteHeader } from "@/components/site-header";
import { VendorDirectory } from "./vendor-directory";
import { createPageMetadata } from "@/lib/seo";
import styles from "./floorplan.module.css";

const floorplanImage = "/images/floorplan/2026-expo-floor-plan-clean-numbers.png";

export const metadata = createPageMetadata({
  title: "Exhibitors & Floor Plan | Colorado SnoMo Expo",
  description:
    "Explore the 2026 Colorado Snomo Expo floorplan and find vendors by booth number.",
  path: "/exhibitors",
});

export default function ExhibitorsPage() {
  return (
    <main className="floorplan-page">
      <SiteHeader />

      <section
        className={`floorplan-preview ${styles.anchorTarget}`}
        id="expo-map"
        aria-labelledby="floorplan-preview-title"
      >
        <div className="floorplan-preview-header">
          <div>
            <p className="floorplan-kicker">Explore the Expo</p>
            <h1 className={styles.mapHeading} id="floorplan-preview-title">2026 Floor Plan</h1>
          </div>
        </div>

        <div className="floorplan-actions" aria-label="Floorplan actions">
          <a className="button button-primary" href="#vendor-assignments">
            View 2026 Participating Vendors
          </a>
          <a
            className="button button-secondary"
            href="/exhibitors/map"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open full-size map in a new tab"
          >
            Open Full-Size Map
          </a>
          <a
            className="button button-secondary"
            href={floorplanImage}
            download="2026-colorado-snomo-expo-floorplan.png"
          >
            Download Map
          </a>
        </div>

        <InteractiveFloorPlan src={floorplanImage} />
      </section>

      <VendorDirectory />
    </main>
  );
}
