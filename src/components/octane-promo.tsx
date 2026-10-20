import Image from "next/image";
import styles from "./octane-promo.module.css";

export function OctanePromo({ className = "" }: { className?: string }) {
  return (
    <section id="octane-show" className={`${styles.promo} ${className}`} aria-labelledby="octane-title">
      <div className={styles.headliners}>
        <h2 id="octane-title" className={styles.title}>
          <span className={styles.logoFrame}>
            <Image
              className={styles.logo}
              src="/images/logos/octane-addictions.png"
              alt="Octane Addictions"
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 85vw, (max-width: 1300px) 42vw, 600px"
            />
          </span>
          <span className={styles.freestyle}>Freestyle</span>
        </h2>

        <div className={styles.featured}>
          <p className={styles.kicker}>Featuring</p>
          <ul className={styles.riders}>
            <li>Brett Turcotte</li>
            <li>Willie Elam</li>
          </ul>
          <p className={styles.honors}>X Games Gold Medalists</p>
          <div className={styles.monster}>
            <Image
              src="/images/logos/monster-energy.png"
              alt="Monster Energy"
              width={802}
              height={363}
              sizes="180px"
            />
            <p>Monster Energy<br />riders</p>
          </div>
        </div>
      </div>

      <div className={styles.supporting}>
        <p className={styles.kicker}>Also Riding</p>
        <ul>
          <li>Cody McDonough</li>
          <li>Bobby Duham</li>
        </ul>
      </div>

      <dl className={styles.times} aria-label="Freestyle times">
        <div>
          <dt>Friday</dt>
          <dd>
            <time dateTime="2026-10-23T17:30:00-06:00">
              5:30 <span className={styles.period}>PM</span>
            </time>
          </dd>
        </div>
        <div>
          <dt>Saturday</dt>
          <dd><time dateTime="2026-10-24T12:00:00-06:00">Noon</time></dd>
        </div>
      </dl>
    </section>
  );
}
