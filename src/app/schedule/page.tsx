import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { VisitReturnLink } from "@/components/visit-return-link";
import { createPageMetadata } from "@/lib/seo";
import styles from "./schedule.module.css";

const expoDays = [
  {
    day: "Friday",
    date: "October 23, 2026",
    hours: "4:00 PM – 8:00 PM",
    title: "Opening Night",
  },
  {
    day: "Saturday",
    date: "October 24, 2026",
    hours: "9:00 AM – 5:00 PM",
    title: "Main Expo Day",
  },
];

const admissionDetails = [
  "Tickets Available at the Box Office Only",
  "No Online Ticket Sales",
  "Children 12 and under admitted free",
  "Cash and major credit cards accepted at the box office",
];

const saturdayEvents = [
  {
    id: "csa-meeting",
    time: "9:00 AM",
    dateTime: "2026-10-24T09:00:00-06:00",
    title: "Colorado Snowmobile Association Meeting",
    location: "Back Room",
  },
  {
    id: "entz-family",
    time: "11:00 AM",
    dateTime: "2026-10-24T11:00:00-06:00",
    title: "Matt Entz & Family",
    topic: "Riding as a Family in the Backcountry",
    affiliation: "Mountain Skillz · Southern Colorado",
    description:
      "Explore the unique dynamics of riding together as a family. Matt and his family own and operate Mountain Skillz, a snowmobile guiding outfit and AIARE avalanche education school in southern Colorado. They share insights from working and playing on the mountain together.",
    image: {
      src: "/images/speakers/matt-entz.jpg",
      alt: "Matt Entz",
      width: 439,
      height: 500,
    },
  },
  {
    id: "saturday-freestyle",
    time: "Noon",
    dateTime: "2026-10-24T12:00:00-06:00",
    title: "Octane Addictions Freestyle Show",
  },
  {
    id: "chris-burandt",
    time: "1:15 PM",
    dateTime: "2026-10-24T13:15:00-06:00",
    title: "Chris Burandt",
    topic: "Backcountry Tech Tips",
    affiliation: "Burandt’s Backcountry Adventures · Buena Vista, Colorado",
    description:
      "Chris Burandt shares the tech tips, sled setup, and riding practices he uses to get the most from his backcountry days. Learn how he prepares for the best results on the mountain.",
    image: {
      src: "/images/speakers/chris-burandt.jpg",
      alt: "Chris Burandt on his snowmobile",
      width: 451,
      height: 550,
    },
  },
  {
    id: "erik-woog",
    time: "2:15 PM",
    dateTime: "2026-10-24T14:15:00-06:00",
    title: "Erik Woog · Team VOHK",
    topic: "Performance Tech Talk",
    affiliation: "Alpine Motorsports · Kremmling, Colorado",
    description:
      "Join Erik Woog and Team VOHK for a Q&A on sled performance, with an emphasis on weight reduction, cost versus benefit, and handling improvements for recent OEM sleds. Explore hood and intake combinations that improve performance while reducing weight, with audience questions guiding the discussion and time for individual engagement.",
    image: {
      src: "/images/speakers/erik-woog.jpg",
      alt: "Erik Woog",
      width: 375,
      height: 469,
    },
  },
];

export const metadata = createPageMetadata({
  title: "Schedule | Colorado Snomo Expo",
  description:
    "Plan your Colorado Snomo Expo weekend: freestyle shows, Friday survival with Jeff Hartsough, and Saturday seminars with the Entz family, Chris Burandt, and Erik Woog.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <main className="schedule-page">
      <SiteHeader />
      <VisitReturnLink />

      <section className="schedule-page-header" aria-labelledby="schedule-title">
        <h1 id="schedule-title">
          Plan your Colorado SnoMO Expo weekend
        </h1>
      </section>

      <section
        className={`schedule-hours ${styles.admissionSection}`}
        aria-labelledby="schedule-admission-title"
      >
        <article className={`schedule-hours-card schedule-hours-card-gold schedule-admission-card ${styles.admissionCard}`}>
          <div className={styles.admissionHeading}>
            <p>Box Office Only</p>
            <h2 id="schedule-admission-title">$10 Admission</h2>
          </div>
          <ul>
            {admissionDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
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

      <section
        id="saturday-schedule"
        className={styles.saturdaySchedule}
        aria-labelledby="saturday-schedule-title"
      >
        <div className="schedule-section-heading">
          <p className="schedule-kicker">October 24, 2026</p>
          <h2 id="saturday-schedule-title">Saturday Schedule</h2>
        </div>

        <ol className={styles.eventList} role="list">
          {saturdayEvents.map((event) => (
            <li key={event.id}>
              <article
                id={event.id}
                className={styles.event}
                aria-labelledby={`${event.id}-title`}
              >
                <time className={styles.eventTime} dateTime={event.dateTime}>
                  {event.time}
                </time>
                <div className={event.image ? styles.eventWithImage : styles.eventDetails}>
                  <div className={styles.eventCopy}>
                    <h3 id={`${event.id}-title`}>{event.title}</h3>
                    {event.topic ? <p className={styles.eventTopic}>{event.topic}</p> : null}
                    {event.affiliation ? (
                      <p className={styles.eventAffiliation}>{event.affiliation}</p>
                    ) : null}
                    {event.location ? (
                      <p className={styles.eventLocation}>{event.location}</p>
                    ) : null}
                    {event.description ? <p>{event.description}</p> : null}
                  </div>
                  {event.image ? (
                    <Image
                      className={styles.eventImage}
                      src={event.image.src}
                      alt={event.image.alt}
                      width={event.image.width}
                      height={event.image.height}
                      sizes="200px"
                    />
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="schedule-hours" aria-labelledby="schedule-hours-title">
        <div className="schedule-section-heading">
          <p className="schedule-kicker">Event Hours</p>
          <h2 id="schedule-hours-title">Expo Weekend</h2>
        </div>

        <div className="schedule-hours-list">
          <article className="schedule-hours-card schedule-hours-card-gold" aria-label="Expo hours">
            <div className={styles.expoDays}>
              {expoDays.map((eventDay) => (
                <div className={styles.expoDay} key={eventDay.day}>
                  <div className="schedule-hours-card-header">
                    <p>{eventDay.day}</p>
                  </div>
                  <h3>{eventDay.date}</h3>
                  <strong>{eventDay.hours}</strong>
                  <span>{eventDay.title}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="schedule-hours-card schedule-hours-card-red" aria-label="Swap Meet hours">
            <div className="schedule-hours-card-header">
              <p>Swap Meet</p>
              <span className="schedule-hours-badge">Free Entry</span>
            </div>
            <h3>Saturday, October 24, 2026</h3>
            <strong>9:00 AM – 5:00 PM</strong>
            <span>FREE ENTRY</span>
          </article>
        </div>
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
