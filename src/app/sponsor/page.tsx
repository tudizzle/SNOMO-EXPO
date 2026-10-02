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

const sponsorshipOpportunities = [
  "Logo placement on event marketing materials",
  "Logo placement throughout the event venue",
  "Outdoor event signage",
  "Parking lot signage, such as \"Free Parking Provided By\"",
  "Booth featured on the Colorado Snomo Expo Passport Card to help increase attendee traffic",
  "Giveaway sponsorship opportunities",
  "Prize donations",
  "Custom sponsorship opportunities tailored to your business",
];

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
                    sizes="(max-width: 520px) 90vw, (max-width: 1000px) 44vw, 280px"
                  />
                </div>
                <p className={styles.name}>{sponsor.name}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="sponsor-introduction" aria-label="Sponsor introduction">
        <div className="sponsor-graphic" aria-hidden="true">
          <span>Winter Starts Here</span>
        </div>
        <div>
          <p>Colorado Snomo Expo is more than just a trade show.</p>
          <p>
            It is the annual kickoff to winter for the Rocky Mountain snowmobile
            community.
          </p>
          <p>
            Our sponsors play an essential role in creating an unforgettable
            event while receiving premium visibility throughout our marketing
            campaign and during the Expo.
          </p>
        </div>
      </section>

      <section className="sponsor-section" aria-labelledby="why-sponsor-title">
        <div className="sponsor-section-heading">
          <p className="sponsor-kicker">Why Sponsor?</p>
          <h2 id="why-sponsor-title">Visibility with the Right Audience</h2>
        </div>
        <p className="sponsor-lead">
          Sponsorship opportunities are designed to maximize brand exposure while
          helping support one of the fastest-growing snowmobile events in the
          region.
        </p>
      </section>

      <section
        className="sponsor-section"
        aria-labelledby="sponsorship-opportunities-title"
      >
        <div className="sponsor-section-heading">
          <p className="sponsor-kicker">Sponsorship Opportunities</p>
          <h2 id="sponsorship-opportunities-title">Premium Event Presence</h2>
        </div>

        <div className="sponsor-opportunity-list">
          {sponsorshipOpportunities.map((opportunity) => (
            <article className="sponsor-opportunity" key={opportunity}>
              <span aria-hidden="true" />
              <p>{opportunity}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sponsor-notice" aria-labelledby="more-sponsorship-title">
        <h2 id="more-sponsorship-title">
          More Sponsorship Opportunities Are Being Finalized
        </h2>
        <p>
          We are currently developing additional sponsorship packages and
          promotional opportunities for the 2026 Colorado Snomo Expo.
        </p>
        <p>
          New sponsorship levels and opportunities will be announced as they
          become available.
        </p>
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
