import { SiteHeader } from "@/components/site-header";

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

const seminarTopics = [
  "Snowmobile Performance",
  "Mountain Riding Techniques",
  "Avalanche Safety",
  "Backcountry Winter Survival",
  "Navigation & Rescue",
  "New Product Demonstrations",
];

export const metadata = {
  title: "Schedule | Colorado Snomo Expo",
  description:
    "Plan your Colorado Snomo Expo weekend and don't miss presentations from some of the snowmobile industry's leading experts.",
};

export default function SchedulePage() {
  return (
    <main className="schedule-page">
      <SiteHeader />

      <section className="schedule-page-header" aria-labelledby="schedule-title">
        <p className="schedule-kicker">Colorado Snomo Expo</p>
        <h1 id="schedule-title">Schedule</h1>
        <p>
          Plan your Colorado Snomo Expo weekend and don&apos;t miss presentations
          from some of the snowmobile industry&apos;s leading experts.
        </p>
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

      <section className="schedule-feature" aria-labelledby="schedule-feature-title">
        <div className="schedule-feature-visual" aria-hidden="true">
          <div>
            <span>Seminar Stage</span>
            <strong>Speaker Lineup</strong>
            <span>Coming Soon</span>
          </div>
        </div>

        <div className="schedule-feature-content">
          <p className="schedule-kicker">Seminars</p>
          <h2 id="schedule-feature-title">2026 Seminar Schedule Coming Soon</h2>
          <p>
            We are currently finalizing an incredible lineup of free seminars
            presented by leading industry professionals.
          </p>

          <div className="schedule-topic-list" aria-label="Seminar topics will include">
            <p>Topics will include:</p>
            <ul>
              {seminarTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>

          <p>New seminars and speakers will be added as they are confirmed.</p>
        </div>
      </section>

      <section className="schedule-bottom-cta" aria-label="Schedule updates">
        <p>Want to be the first to know when the seminar schedule is released?</p>
        <button className="button button-primary" type="button">
          Check Back Soon
        </button>
      </section>
    </main>
  );
}
