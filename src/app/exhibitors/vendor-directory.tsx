"use client";

import { useState } from "react";
import { vendorAssignments2026 } from "@/data/vendor-assignments-2026";
import styles from "./floorplan.module.css";

const byBooth = [...vendorAssignments2026].sort((first, second) => first.booth - second.booth);
const byCompany = [...vendorAssignments2026].sort((first, second) =>
  first.name.localeCompare(second.name, "en", { sensitivity: "base", numeric: true }) ||
  first.booth - second.booth,
);

export function VendorDirectory() {
  const [sortOrder, setSortOrder] = useState<"booth" | "company">("booth");
  const assignments = sortOrder === "booth" ? byBooth : byCompany;

  return (
    <section
      className={`${styles.directory} ${styles.anchorTarget}`}
      id="vendor-assignments"
      aria-labelledby="vendor-assignments-title"
    >
      <div className={`floorplan-preview-header ${styles.directoryHeader}`}>
        <div>
          <p className="floorplan-kicker">2026 Colorado Snomo Expo</p>
          <h2 id="vendor-assignments-title">2026 Participating Vendors</h2>
        </div>
        <div className={`floorplan-actions ${styles.sortControls}`} role="group" aria-label="Vendor listing order">
          <button
            type="button"
            className={`button ${sortOrder === "booth" ? "button-primary" : "button-secondary"}`}
            aria-pressed={sortOrder === "booth"}
            aria-controls="vendor-directory-table"
            onClick={() => setSortOrder("booth")}
          >
            List by Booth Number
          </button>
          <button
            type="button"
            className={`button ${sortOrder === "company" ? "button-primary" : "button-secondary"}`}
            aria-pressed={sortOrder === "company"}
            aria-controls="vendor-directory-table"
            onClick={() => setSortOrder("company")}
          >
            List Alphabetically
          </button>
        </div>
      </div>

      <table id="vendor-directory-table" className={styles.table} aria-label="2026 Participating Vendors">
        <colgroup>
          <col className={styles.boothColumn} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" aria-sort={sortOrder === "booth" ? "ascending" : undefined}>Booth</th>
            <th scope="col" aria-sort={sortOrder === "company" ? "ascending" : undefined}>Company</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={`${assignment.booth}-${assignment.name}`}>
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
  );
}
