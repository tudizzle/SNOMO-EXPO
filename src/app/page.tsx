import Link from "next/link";

export default function Home() {
  return (
    <main className="hero-shell">
      <section className="hero" aria-label="Colorado Snomo Expo hero">
        <div className="hero-snow" aria-hidden="true" />
        <nav className="hero-nav" aria-label="Primary navigation">
          <Link className="brand" href="/">
            Colorado Snomo Expo
          </Link>
          <div className="nav-links" aria-label="Event links">
            <Link href="/plan-your-visit">Plan Your Visit</Link>
            <Link href="/vendors">Vendors</Link>
          </div>
        </nav>

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
    </main>
  );
}
