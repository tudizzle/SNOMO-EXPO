import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/seo";
import vendorLogos from "@/data/vendor-logos-2026.json";
import styles from "./sponsor.module.css";

const sponsors = [
  { key: "Mountain Side Performance", name: "Mountain Side Performance", treatment: "white-matte" },
  { key: "Polaris", name: "Polaris", treatment: "blue" },
  { key: "ARVA", name: "ARVA", treatment: "dark-ink" },
  { key: "TKI CNC", name: "TKI CNC", treatment: "black-matte" },
  { key: "Push industries", name: "PUSH Industries", treatment: "original" },
  { key: "ORTOVOX", name: "ORTOVOX", treatment: "white-cropped" },
  { key: "Fox Factory", name: "FOX", treatment: "original" },
  { key: "Tylers Backcountry Awareness", name: "Tylers Backcountry Awareness", treatment: "original" },
  { key: "Octane Ink", name: "Octane Ink", src: "/images/sponsors/octane-ink.svg", treatment: "dark-ink" },
  { key: "509", name: "509", src: "/images/sponsors/509.png", treatment: "white" },
  { key: "Marlon", name: "Marlon Recreational Products USA", src: "/images/sponsors/marlon-usa.jpg", treatment: "monochrome-matte" },
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
        {/* Knock out baked-in mattes at render time, leaving the shared assets intact. */}
        <svg className={styles.filters} aria-hidden="true" focusable="false">
          <defs>
            <filter id="sponsor-white-matte" colorInterpolationFilters="sRGB">
              <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 -1 -1 0 1" result="lightInk" />
              <feComposite in="lightInk" in2="SourceGraphic" operator="over" result="artwork" />
              <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 -1 -1 0 2.85" result="matte" />
              <feComposite in="artwork" in2="matte" operator="in" result="cutout" />
              <feComposite in="cutout" in2="SourceAlpha" operator="in" />
            </filter>
            <filter id="sponsor-black-matte" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .227 .765 .077 0 -.04" />
            </filter>
            <filter id="sponsor-dark-ink" colorInterpolationFilters="sRGB">
              <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.1 -1.1 -1.1 0 1" result="lightInk" />
              <feComposite in="lightInk" in2="SourceAlpha" operator="in" result="maskedInk" />
              <feComposite in="maskedInk" in2="SourceGraphic" operator="over" />
            </filter>
          </defs>
        </svg>
        <ul className={styles.grid} role="list">
          {sponsors.map((sponsor, index) => {
            const logoSrc = "src" in sponsor ? sponsor.src : vendorLogos[sponsor.key].src;

            return (
              <li className={styles.sponsor} key={sponsor.key}>
                <div
                  className={styles.hoveringLogo}
                  style={{ animationDelay: `${index * -1.15}s` }}
                >
                  <div className={styles.logoShadow}>
                    <Image
                      className={styles.logo}
                      data-treatment={sponsor.treatment}
                      src={logoSrc}
                      alt={`${sponsor.name} logo`}
                      fill
                      sizes="(max-width: 520px) 80vw, (max-width: 1000px) 40vw, 260px"
                    />
                  </div>
                </div>
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
