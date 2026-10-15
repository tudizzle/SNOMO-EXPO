import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { VisitReturnLink } from "@/components/visit-return-link";
import { createPageMetadata } from "@/lib/seo";
import styles from "./schedule.module.css";

const eventDays = [
  {
    day: "Friday",
    date: "October 23, 2026",
    hours: "4:00 PM – 8:00 PM",
    title: "Opening Night",
    accent: "red",
  },
  {
    day: "Saturday",
    date: "October 24, 2026",
    hours: "9:00 AM – 5:00 PM",
    title: "Main Expo Day",
    accent: "gold",
  },
  {
    day: "Swap Meet",
    date: "Saturday, October 24, 2026",
    hours: "9:00 AM – 5:00 PM",
    title: "FREE ENTRY",
    accent: "red",
    badge: "Free Entry",
  },
];

const admissionDetails = [
  "Tickets Available at the Box Office Only",
  "No Online Ticket Sales",
  "Children 12 and under admitted free",
  "Cash and major credit cards accepted at the box office",
];

export const metadata = createPageMetadata({
  title: "Schedule | Colorado Snomo Expo",
  description:
    "See the Octane Addictions Freestyle Show and join Jeff Hartsough for Backcountry Winter Survival on Friday, October 23 at 6:30 PM. Explore expo hours and admission.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <main className="schedule-page">
      <SiteHeader />
      <VisitReturnLink />

      <section className="schedule-page-header" aria-labelledby="schedule-title">
        <p className="schedule-kicker">Colorado Snomo Expo</p>
        <h1 id="schedule-title">Schedule</h1>
        <p>
          Plan your Colorado Snomo Expo weekend, from the Octane Addictions
          Freestyle Show to presentations by leading industry experts.
        </p>
      </section>

      <section id="octane-show" className={styles.octane} aria-labelledby="octane-title">
        <div className={styles.brand}>
          <h2 id="octane-title" className={styles.title}>
            <span className={styles.logoFrame}>
              <Image
                className={styles.logo}
                src="/images/logos/octane-addictions.png"
                alt="Octane Addictions"
                width={1536}
                height={1024}
                sizes="(max-width: 760px) 85vw, (max-width: 1300px) 48vw, 590px"
              />
            </span>
            <span className={styles.freestyle}>Freestyle Show</span>
          </h2>
        </div>

        <div className={styles.showtimes}>
          <p className={styles.kicker}>Showtimes</p>
          <dl className={styles.times}>
            <div className={styles.showtime}>
              <dt>Friday</dt>
              <dd>
                <time dateTime="2026-10-23T17:30:00-06:00">
                  5:30 <span className={styles.period}>PM</span>
                </time>
              </dd>
            </div>
            <div className={styles.showtime}>
              <dt>Saturday</dt>
              <dd>
                <time dateTime="2026-10-24T12:00:00-06:00">Noon</time>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        id="backcountry-winter-survival"
        className={`schedule-feature ${styles.speakerFeature}`}
        aria-labelledby="schedule-speaker-title"
      >
        <Image
          className={styles.speakerPoster}
          src="/images/speakers/jeff-hartsough-backcountry-winter-survival.jpg"
          alt="Backcountry Winter Survival with retired Green Beret Jeff Hartsough — Tyler’s Backcountry Awareness"
          width={1152}
          height={1728}
          sizes="(max-width: 760px) 90vw, (max-width: 1300px) 40vw, 490px"
        />

        <div className={`schedule-feature-content ${styles.speakerContent}`}>
          <p className="schedule-kicker">Friday Guest Speaker</p>
          <h2 id="schedule-speaker-title">Backcountry Winter Survival</h2>
          <div className={styles.speakerIdentity}>
            <p className={styles.speakerName}>Jeff Hartsough</p>
            <p>Retired Green Beret</p>
          </div>
          <p>
            Learn practical winter survival skills with retired U.S. Army Green
            Beret and avalanche instructor Jeff Hartsough of Tyler’s Backcountry
            Awareness. Drawing on six years teaching winter warfare, Jeff covers
            staying warm, building shelters, finding water, navigating whiteouts,
            signaling for help, and handling backcountry emergencies.
          </p>
          <time
            className={styles.speakerTime}
            dateTime="2026-10-23T18:30:00-06:00"
          >
            <span>Friday, October 23, 2026</span>
            <strong>6:30 PM</strong>
          </time>
        </div>
      </section>

      <section className="schedule-hours" aria-labelledby="schedule-hours-title">
        <div className="schedule-section-heading">
          <p className="schedule-kicker">Event Hours</p>
          <h2 id="schedule-hours-title">Expo Weekend</h2>
        </div>

        <div className="schedule-hours-list">
          {eventDays.map((eventDay) => (
            <article
              className={`schedule-hours-card schedule-hours-card-${eventDay.accent}`}
              key={eventDay.day}
            >
              <div className="schedule-hours-card-header">
                <p>{eventDay.day}</p>
                {eventDay.badge ? (
                  <span className="schedule-hours-badge">{eventDay.badge}</span>
                ) : null}
              </div>
              <h3>{eventDay.date}</h3>
              <strong>{eventDay.hours}</strong>
              <span>{eventDay.title}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="schedule-hours" aria-labelledby="schedule-admission-title">
        <div className="schedule-section-heading">
          <p className="schedule-kicker">Admission</p>
          <h2 id="schedule-admission-title">$10 Admission</h2>
        </div>

        <article className="schedule-hours-card schedule-hours-card-gold schedule-admission-card">
          <div className="schedule-hours-card-header">
            <p>Box Office Only</p>
          </div>
          <ul>
            {admissionDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="schedule-bottom-cta" aria-label="Schedule updates">
        <p>
          More seminars and speakers will be added as they are confirmed.
          Check back for schedule updates.
        </p>
      </section>
    </main>
  );
}
