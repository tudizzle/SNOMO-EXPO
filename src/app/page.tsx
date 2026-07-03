import Image from "next/image";
import Link from "next/link";
import { CountdownSection } from "@/components/countdown-section";
import { HeroAudioButton } from "@/components/hero-audio-button";
import { SiteHeader } from "@/components/site-header";

type FooterLink = {
  label: string;
  href: string;
  rel?: string;
  target?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
  comingSoon?: string;
};

const footerColumns: FooterColumn[] = [
  {
    title: "Plan",
    links: [
      { label: "Exhibitors", href: "/exhibitors" },
      { label: "Floorplan", href: "/floorplan" },
      { label: "Schedule", href: "/schedule" },
      { label: "Swap Meet", href: "/swap-meet" },
    ],
  },
  {
    title: "Exhibit",
    links: [
      { label: "Become a Vendor", href: "/vendors" },
      { label: "Sponsor the Expo", href: "/sponsor" },
    ],
    comingSoon: "Vendor Success Center (Coming Soon)",
  },
  {
    title: "Connect",
    links: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61563698281162",
        rel: "noopener noreferrer",
        target: "_blank",
      },
      { label: "Instagram", href: "#" },
      { label: "Contact", href: "mailto:tudizzle@gmail.com" },
    ],
  },
];

export default function Home() {
  return (
    <main className="hero-shell">
      <SiteHeader />
      <section className="hero" aria-label="Colorado Snomo Expo hero">
        <Image
          className="hero-image"
          src="/images/hero/colorado-snomo-hero.jpg"
          alt="Snowmobiler carving through deep powder in a snowy Colorado forest"
          fill
          priority
          quality={92}
          sizes="100vw"
        />
        <div className="hero-snow" aria-hidden="true" />
        <HeroAudioButton />

        <div className="hero-content">
          <p className="hero-kicker">Colorado Snomo Expo</p>
          <h1>Your Winter Starts Here.</h1>
          <p className="hero-subtitle">
            The Rocky Mountain Region&apos;s Premier Winter Powersports Expo
          </p>

          <dl className="event-details" aria-label="Event details">
            <div>
              <dt>When</dt>
              <dd>October 23-24, 2026</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>National Western Complex</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Denver, Colorado</dd>
            </div>
          </dl>

          <div className="hero-actions" aria-label="Hero actions">
            <Link className="button button-primary" href="/vendors">
              Become a Vendor
            </Link>
            <Link className="button button-secondary" href="/plan-your-visit">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      <CountdownSection />

      <section className="experience-section" aria-labelledby="experience-title">
        <div className="experience-container">
          <div className="experience-heading">
            <p className="experience-kicker">Start Here</p>
            <h2 id="experience-title">Choose Your Experience</h2>
          </div>

          <div className="experience-grid">
            <article className="experience-card">
              <Image
                className="experience-card-image"
                src="/images/gallery/diz-tetons.jpg"
                alt="Snowmobiler at a snowy overlook with the Tetons in the distance"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="experience-card-content">
                <h3>Coming to the Show?</h3>
                <p>
                  Plan your visit, discover exhibitors, explore the schedule,
                  and experience everything the Colorado Snomo Expo has to offer.
                </p>
                <Link className="button button-secondary" href="/plan-your-visit">
                  Start Planning
                </Link>
              </div>
            </article>

            <article className="experience-card">
              <Image
                className="experience-card-image experience-card-image-vendor"
                src="/images/experience/showcase-your-business-02.jpg"
                alt="Vendor booth with winter powersports gear displays at the Colorado Snomo Expo"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="experience-card-content">
                <h3>Showcase Your Business</h3>
                <p>
                  Connect with thousands of riders across the Rocky Mountain
                  Region by exhibiting at Colorado Snomo Expo.
                </p>
                <Link className="button button-primary" href="/vendors">
                  Become a Vendor
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="homepage-farewell" aria-labelledby="farewell-title">
        <div className="homepage-farewell-inner">
          <h2 id="farewell-title">We&apos;ll See You In Denver.</h2>
          <div className="homepage-farewell-details" aria-label="Event information">
            <p>October 23-24, 2026</p>
            <p>National Western Complex</p>
            <p>Denver, Colorado</p>
          </div>
          <div className="homepage-farewell-actions" aria-label="Farewell actions">
            <Link className="button button-primary" href="/vendors">
              Become a Vendor
            </Link>
            <Link className="button button-secondary" href="/plan-your-visit">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer" aria-label="Colorado Snomo Expo footer">
        <div className="site-footer-brand">
          <Image
            alt="Colorado Snomo Expo"
            className="site-footer-logo"
            height={532}
            src="/images/logos/colorado-snomo-expo-primary.png"
            width={1301}
          />
          <p>Your Winter Starts Here.</p>
        </div>

        <div className="site-footer-columns">
          {footerColumns.map((column) => (
            <nav className="site-footer-column" key={column.title} aria-label={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  rel={link.rel}
                  target={link.target}
                >
                  {link.label}
                </Link>
              ))}
              {column.comingSoon ? <span>{column.comingSoon}</span> : null}
            </nav>
          ))}
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 Colorado Snomo Expo</p>
          <p>Built with pride for the Rocky Mountain snowmobile community.</p>
          <span>Version 2026</span>
        </div>
      </footer>
    </main>
  );
}
