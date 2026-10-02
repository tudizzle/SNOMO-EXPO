import Link from "next/link";
import styles from "./visit-return-link.module.css";

export function VisitReturnLink() {
  return (
    <nav className={styles.navigation} aria-label="Visit planning">
      <Link className={styles.link} href="/plan-your-visit">
        <span aria-hidden="true">←</span>
        Back to Plan Your Visit
      </Link>
    </nav>
  );
}
