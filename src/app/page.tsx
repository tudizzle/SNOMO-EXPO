import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const whyAttendFeatures = [
  {
    title: "See the Latest Snowmobiles",
    copy: "Be among the first to experience the newest mountain, crossover and trail snowmobiles from Polaris, Arctic Cat and Ski-Doo.",
    image: "/images/why-attend/latest-snowmobiles.jpg",
    alt: "Latest Polaris snowmobiles on display at the Colorado Snomo Expo",
  },
  {
    title: "Performance • Gear • Accessories",
    copy: "Discover the latest aftermarket performance products, riding gear, helmets, apparel and winter accessories from the industry's leading brands.",
    image: "/images/why-attend/new-products-gear.jpg",
    alt: "Winter powersports products and gear displayed in an expo booth",
  },
  {
    title: "Learn • Connect • Ride",
    copy: "Attend informative seminars, connect with snowmobile clubs, meet fellow riders and kick off another unforgettable riding season.",
    image: "/images/why-attend/meet-the-community.jpg",
    alt: "Colorado Snomo Expo vendor booth with people greeting attendees",
  },
  {
    title: "Swap • Win • Explore",
    copy: "Browse the Rocky Mountain Swap Meet, discover rare parts, and enter to win exciting prizes and giveaways throughout the weekend.",
    image: "/images/why-attend/rocky-mountain-swap-meet.jpg",
    alt: "Vendor table with winter riding packs, shovels, and backcountry gear",
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

      <section className="why-attend-section" aria-labelledby="why-attend-title">
        <div className="why-attend-intro">
          <p className="why-attend-kicker">Why Attend</p>
          <h2 id="why-attend-title">Everything You Need Before the Snow Flies</h2>
        </div>

        <div className="why-attend-rows">
          {whyAttendFeatures.map((feature) => (
            <article className="why-attend-row" key={feature.title}>
              <div className="why-attend-media">
                <Image
                  className="why-attend-image"
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
              </div>
              <div className="why-attend-copy">
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
