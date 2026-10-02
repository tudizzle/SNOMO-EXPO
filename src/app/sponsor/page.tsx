import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/seo";
import vendorLogos from "@/data/vendor-logos-2026.json";
import styles from "./sponsor.module.css";

const sponsors = [
  { key: "Mountain Side Performance", name: "Mountain Side Performance" },
  { key: "Polaris", name: "Polaris" },
  { key: "ARVA", name: "ARVA" },
  { key: "TKI CNC", name: "TKI CNC" },
  { key: "Push industries", name: "PUSH Industries" },
  { key: "ORTOVOX", name: "ORTOVOX" },
  { key: "Fox Factory", name: "FOX" },
  { key: "Tylers Backcountry Awareness", name: "Tylers Backcountry Awareness" },
] as const;

export const metadata = createPageMetadata({
  title: "Sponsors | Colorado Snomo Expo",
  description:
    "Meet the sponsors supporting the 2026 Colorado Snomo Expo and explore opportunities to become a partner.",
  path: "/sponsor",
});

export default function SponsorPage() {
  return (
    <main className="sponsor-page">
      <SiteHeader />

      <section className="sponsor-page-header" aria-labelledby="sponsor-title">
        <p className="sponsor-kicker">Colorado Snomo Expo</p>
        <h1 id="sponsor-title">Our Sponsors</h1>
        <p>
          Thank you to the partners helping bring the 2026 Colorado Snomo Expo
          to life.
        </p>
      </section>

      <section className={styles.sponsors} aria-label="2026 sponsors">
        <ul className={styles.grid} role="list">
          {sponsors.map((sponsor) => {
            const logo = vendorLogos[sponsor.key];

            return (
              <li className={styles.card} key={sponsor.key}>
                <div className={styles.logoFrame} data-background={logo.background}>
                  <Image
                    className={styles.logo}
                    src={logo.src}
                    alt={`${sponsor.name} logo`}
                    fill
                    style={"scale" in logo ? { transform: `scale(${logo.scale})` } : undefined}
                    sizes="(max-width: 520px) 90vw, (max-width: 1000px) 44vw, 280px"
                  />
                </div>
                <p className={styles.name}>{sponsor.name}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="sponsor-bottom-cta" aria-labelledby="sponsor-cta-title">
        <div>
          <p className="sponsor-kicker">Partner With Us</p>
          <h2 id="sponsor-cta-title">Let&apos;s Build Something Great Together</h2>
          <p>Interested in learning more about sponsorship opportunities?</p>
          <p>
            We would love to discuss how your business can become part of the
            Colorado Snomo Expo experience.
          </p>
        </div>
        <Link
          className="button button-primary"
          href="https://form.jotform.com/261864940204053"
          target="_blank"
          rel="noopener noreferrer"
        >
          Request Sponsorship Info
        </Link>
      </section>
    </main>
  );
}
