import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const quickActions = [
  { href: "/exhibitors", label: "View Exhibitors" },
  { href: "/floorplan", label: "View Floorplan" },
  { href: "/schedule", label: "View Schedule" },
  { href: "/swap-meet", label: "Swap Meet Information" },
];

const eventInfo = [
  {
    title: "Event Dates",
    details: ["October 23–24, 2026"],
  },
  {
    title: "Location",
    details: ["National Western Complex", "Denver, Colorado"],
  },
  {
    title: "Admission",
    details: [
      "$10 Admission",
      "Tickets Available at the Box Office Only",
      "No Online Ticket Sales",
      "Children 12 & Under Admitted Free",
      "Cash and Major Credit Cards Accepted",
    ],
  },
];

const showHours = [
  {
    title: "Friday",
    date: "October 23, 2026",
    hours: "4:00 PM – 8:00 PM",
  },
  {
    title: "Saturday",
    date: "October 24, 2026",
    hours: "9:00 AM – 5:00 PM",
  },
  {
    title: "Swap Meet",
    date: "Saturday, October 24, 2026",
    hours: "9:00 AM – 5:00 PM",
    note: "FREE ENTRY TO THE SWAP MEET",
  },
];

const hotelFeatures = [
  "Complimentary Breakfast",
  "Free Wi-Fi",
  "Free Parking",
  "Spacious Studio & Suite Rooms",
  "Minutes from the National Western Complex",
];

const faqs = [
  {
    question: "Are tickets sold online?",
    answer: "No. Tickets are available only at the Box Office.",
  },
  {
    question: "How much is admission?",
    answer: "Admission is $10.",
  },
  {
    question: "Are kids free?",
    answer: "Children 12 & Under are admitted free.",
  },
  {
    question: "Is parking available?",
    answer: "Yes. Parking details will be announced closer to the event.",
  },
  {
    question: "Where is the National Western Complex?",
    answer: "4655 Humboldt Street, Denver, Colorado",
  },
];

export const metadata = {
  title: "Plan Your Visit | Colorado Snomo Expo",
  description:
    "Everything you need to plan an incredible weekend at the Colorado Snomo Expo.",
};

export default function PlanYourVisitPage() {
  return (
    <main className="visit-page">
      <SiteHeader />

      <section className="visit-page-header" aria-labelledby="visit-title">
        <p className="visit-kicker">Colorado Snomo Expo</p>
        <h1 id="visit-title">Plan Your Visit</h1>
        <p>
          Everything you need to plan an incredible weekend at the Colorado Snomo
          Expo.
        </p>
      </section>

      <section className="visit-intro" aria-labelledby="visit-intro-title">
        <div>
          <p className="visit-kicker">Start Here</p>
          <h2 id="visit-intro-title">First Time Visiting?</h2>
        </div>
        <p>
          We&apos;ve gathered everything you need to make the most of your
          Colorado Snomo Expo experience.
        </p>
      </section>

      <section className="visit-quick-actions" aria-label="Quick actions">
        {quickActions.map((action) => (
          <Link className="visit-action" href={action.href} key={action.href}>
            {action.label}
          </Link>
        ))}
      </section>

      <section className="visit-section" aria-labelledby="visit-event-info-title">
        <div className="visit-section-heading">
          <p className="visit-kicker">Event Info</p>
          <h2 id="visit-event-info-title">Event Information</h2>
        </div>

        <div className="visit-info-list">
          {eventInfo.map((item) => (
            <article className="visit-info-row" key={item.title}>
              <h3>{item.title}</h3>
              <div>
                {item.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="visit-section" aria-labelledby="visit-hours-title">
        <div className="visit-section-heading">
          <p className="visit-kicker">Hours</p>
          <h2 id="visit-hours-title">Show Hours</h2>
        </div>

        <div className="visit-schedule-list">
          {showHours.map((item) => (
            <article className="visit-schedule-card" key={item.title}>
              <p>{item.title}</p>
              <h3>{item.date}</h3>
              <strong>{item.hours}</strong>
              {item.note ? <span>{item.note}</span> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="visit-hotel" aria-labelledby="visit-hotel-title">
        <div className="visit-hotel-heading">
          <p className="visit-kicker">Official Recommended Hotel</p>
          <h2 id="visit-hotel-title">Residence Inn Denver Central Park</h2>
          <p>
            4667 North Central Park Boulevard
            <br />
            Denver, Colorado
          </p>
          <p>Located just minutes from the National Western Complex.</p>
        </div>

        <div className="visit-hotel-details">
          <div>
            <p className="visit-kicker">Special Event Rate</p>
            <p>
              Mention <strong>Colorado Snomo Expo</strong> when making your
              reservation to receive the special event rate, subject to
              availability.
            </p>
          </div>

          <div>
            <p className="visit-kicker">Hotel Features</p>
            <ul>
              {hotelFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <Link
            className="button button-primary"
            href="https://www.marriott.com/en-us/hotels/denre-residence-inn-denver-central-park/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Hotel
          </Link>

          <p className="visit-hotel-note">
            Rooms are limited. We recommend booking early to secure the Colorado
            Snomo Expo event rate.
          </p>
        </div>
      </section>

      <section className="visit-two-column" aria-label="Parking information">
        <article>
          <p className="visit-kicker">Parking</p>
          <h2>Parking</h2>
          <p>Parking information and maps will be updated closer to the event.</p>
        </article>
      </section>

      <section className="visit-section" aria-labelledby="visit-faq-title">
        <div className="visit-section-heading">
          <p className="visit-kicker">FAQ</p>
          <h2 id="visit-faq-title">Common Questions</h2>
        </div>

        <div className="visit-faq-list">
          {faqs.map((faq) => (
            <article className="visit-faq" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
