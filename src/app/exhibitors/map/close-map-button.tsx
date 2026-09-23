"use client";

import styles from "./page.module.css";

export function CloseMapButton() {
  const closeMap = () => {
    const returnToMap = () => window.location.replace("/exhibitors#expo-map");
    if (window.history.length > 1) {
      returnToMap();
      return;
    }

    window.close();
    // Browsers may refuse to close a tab opened directly rather than by a link.
    window.setTimeout(returnToMap, 150);
  };

  return (
    <button
      type="button"
      className={styles.close}
      aria-label="Close full-size map"
      title="Close full-size map"
      onClick={closeMap}
    >
      <span aria-hidden="true">×</span>
    </button>
  );
}
