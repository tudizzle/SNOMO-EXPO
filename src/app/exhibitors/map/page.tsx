import type { Metadata } from "next";
import { InteractiveFloorPlan } from "@/components/interactive-floor-plan";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Full-Size Floor Plan | Colorado SnoMo Expo",
  alternates: { canonical: "/exhibitors" },
  robots: { index: false, follow: true },
};

export default function FullSizeMapPage() {
  return (
    <main className={styles.viewer}>
      <div className={styles.toolbar}>
        <h1>2026 Floor Plan</h1>
        <nav className={`floorplan-actions ${styles.actions}`} aria-label="Full-size map actions">
          <a className="button button-secondary" href="/exhibitors#vendor-assignments">
            View Participating Vendors
          </a>
          <a
            className="button button-secondary"
            href="/images/floorplan/2026-expo-floor-plan-clean-numbers.png"
            download="2026-colorado-snomo-expo-floorplan.png"
          >
            Download Map
          </a>
        </nav>
        <p>Hover over or select a booth for vendor details. Scroll to explore the full-size map.</p>
      </div>
      <InteractiveFloorPlan src="/images/floorplan/2026-expo-floor-plan-clean-numbers.png" fullSize />
    </main>
  );
}
