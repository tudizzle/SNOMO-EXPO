import type { Metadata } from "next";
import { InteractiveFloorPlan } from "@/components/interactive-floor-plan";
import { CloseMapButton } from "./close-map-button";
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
        <CloseMapButton />
        <h1>2026 Floor Plan</h1>
        <nav className={styles.actions} aria-label="Full-size map actions">
          <a className="button button-secondary" href="/exhibitors#vendor-assignments">
            Vendor List
          </a>
          <a
            className="button button-secondary"
            href="/images/floorplan/2026-expo-floor-plan-clean-numbers.png"
            download="2026-colorado-snomo-expo-floorplan.png"
          >
            Download Map
          </a>
        </nav>
        <p>Pinch or use +/− to zoom. Drag to explore. Select a booth for vendor details.</p>
      </div>
      <InteractiveFloorPlan src="/images/floorplan/2026-expo-floor-plan-clean-numbers.png" fullSize />
    </main>
  );
}
