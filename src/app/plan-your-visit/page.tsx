import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const quickActions = [
  { href: "/floorplan", label: "View Floorplan" },
  { href: "/exhibitors", label: "View Exhibitors" },
  { href: "/schedule", label: "View Schedule" },
  { href: "/swap-meet", label: "Swap Meet Info" },
];

const eventInfo = [
  {
    title: "Dates",
    details: ["October 23–24, 2026"],
  },
  {
    title: "Location",
    details: ["National Western Complex", "Denver, Colorado"],
  },
  {
    title: "Admission",
    details: [
      "$10 at the box office",
      "No Online Ticket Sales",
      "Children 12 and under admitted free",
      "Cash and major credit cards accepted at the box office",
    ],
  },
  {
    title: "Hours",
    details: [
      "Friday, October 23 — 4:00 PM – 8:00 PM",
      "Saturday, October 24 — 9:00 AM – 5:00 PM",
    ],
  },
  {
    title: "Swap Meet",
    details: [
      "Saturday, October 24 — 9:00 AM – 5:00 PM",
      "Free entry to the swap meet",
    ],
  },
];

const faqs = [
  {
    question: "Are tickets sold online?",
    answer: "No. Tickets are available at the box office only.",
  },
  {
    question: "How much is admission?",
    answer: "Admission is $10 at the box office.",
  },
  {
    question: "Are kids free?",
    answer: "Children 12 and under are admitted free.",
  },
  {
    question: "Is the swap meet included?",
    answer: "The swap meet is free to enter on Saturday.",
  },
];

export const metadata = {
  title: "Plan Your Visit | Colorado Snomo Expo",
  description:
    "Everything you need to know before arriving at the Colorado Snomo Expo.",
};

export default function PlanYourVisitPage() {
  return (
    <main className="visit-page">
      <SiteHeader />

      <section className="visit-page-header" aria-labelledby="visit-title">
        <p className="visit-kicker">Colorado Snomo Expo</p>
        <h1 id="visit-title">Plan Your Visit</h1>
        <p>Everything you need to know before arriving at the Colorado Snomo Expo.</p>
      </section>

      <section className="visit-intro" aria-labelledby="visit-intro-title">
        <div>
          <p className="visit-kicker">Start Here</p>
          <h2 id="visit-intro-title">First Time Visiting?</h2>
        </div>
        <p>
          We&apos;ve gathered everything you need to plan an incredible weekend at
          the Colorado Snomo Expo.
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
          <h2 id="visit-event-info-title">Know Before You Go</h2>
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

      <section className="visit-two-column" aria-label="Parking and hotel information">
        <article>
          <p className="visit-kicker">Parking</p>
          <h2>Parking</h2>
          <p>Parking details are being finalized and will be updated soon.</p>
        </article>

        <article>
          <p className="visit-kicker">Hotels</p>
          <h2>Hotels</h2>
          <p>Hotel recommendations and lodging information are coming soon.</p>
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
