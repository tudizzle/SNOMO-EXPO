import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { vendorAssignments2026 } from "@/data/vendor-assignments-2026";
import { createPageMetadata } from "@/lib/seo";
import styles from "./floorplan.module.css";

const floorplanImage = "/images/floorplan/2026-expo-floor-plan-clean-numbers.png";
const sortedVendorAssignments = [...vendorAssignments2026].sort(
  (first, second) => first.booth - second.booth,
);

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
        className={`floorplan-page-header ${styles.pageHeader}`}
        aria-labelledby="floorplan-title"
      >
        <p className="floorplan-kicker">Colorado Snomo Expo</p>
        <h1 id="floorplan-title">Exhibitors &amp; Floor Plan</h1>
        <p>
          Explore the 2026 expo layout, then find your favorite companies in the
          vendor assignments below.
        </p>
      </section>

      <section
        className={`floorplan-preview ${styles.anchorTarget}`}
        id="expo-map"
        aria-labelledby="floorplan-preview-title"
      >
        <div className="floorplan-preview-header">
          <div>
            <p className="floorplan-kicker">Explore the Expo</p>
            <h2 id="floorplan-preview-title">2026 Floor Plan</h2>
          </div>
        </div>

        <div className="floorplan-actions" aria-label="Floorplan actions">
          <a className="button button-primary" href="#vendor-assignments">
            View Vendor Assignments
          </a>
          <a
            className="button button-secondary"
            href={floorplanImage}
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

        <div className="floorplan-image-frame">
          <Image
            src={floorplanImage}
            alt="2026 Colorado Snomo Expo floorplan showing numbered booths, the seminar room, entrances and venue areas. Vendor assignments are listed below."
            width={2048}
            height={1552}
            unoptimized
            priority
          />
        </div>
      </section>

      <section
        className={`${styles.directory} ${styles.anchorTarget}`}
        id="vendor-assignments"
        aria-labelledby="vendor-assignments-title"
      >
        <div className="floorplan-preview-header">
          <div>
            <p className="floorplan-kicker">2026 Colorado Snomo Expo</p>
            <h2 id="vendor-assignments-title">Vendor Assignments</h2>
          </div>
          <p>Listed by booth number</p>
        </div>

        <table className={styles.table} aria-label="2026 vendor booth assignments">
          <colgroup>
            <col className={styles.boothColumn} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Booth</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody>
            {sortedVendorAssignments.map((assignment, index) => (
              <tr key={`${assignment.booth}-${assignment.name}-${index}`}>
                <th scope="row">{assignment.booth}</th>
                <td>{assignment.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="floorplan-actions">
          <a className="button button-secondary" href="#expo-map">
            Back to Map
          </a>
        </div>
      </section>
    </main>
  );
}
