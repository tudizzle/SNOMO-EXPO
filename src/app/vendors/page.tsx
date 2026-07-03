import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const marketOpportunityCards = [
  {
    title: "Large Regional Audience",
    body:
      "A 100-mile radius around Denver reaches riders, families, clubs, dealers, manufacturers, and outdoor recreation buyers across the Front Range.",
  },
  {
    title: "High-Value Customer Base",
    body:
      "The market includes an estimated 250,000–450,000 powersports-adjacent consumers, with 75,000–150,000 high-intent buyers interested in vehicles, gear, accessories, trailers, boats, and outdoor recreation products.",
  },
  {
    title: "Strong Buying Demographics",
    body:
      "Core attendees are typically ages 25–55, with many households earning $75,000–$200,000+ annually.",
  },
  {
    title: "Outdoor Lifestyle Market",
    body:
      "Front Range consumers actively participate in snowmobiling, ATV/UTV riding, dirt biking, boating, camping, hunting, fishing, overlanding, and mountain travel.",
  },
  {
    title: "Truck, Trailer & Gear Ownership",
    body:
      "This market has a strong concentration of consumers who already own or are actively shopping for trucks, trailers, powersports equipment, boats, and premium outdoor gear.",
  },
  {
    title: "Prime Geographic Reach",
    body:
      "The Expo draws from Denver, Colorado Springs, Boulder, Fort Collins, Loveland, Greeley, and surrounding mountain gateway communities.",
  },
  {
    title: "Multiple Customer Segments",
    body:
      "Vendors can reach hardcore enthusiasts, weekend adventure families, hunters, anglers, campers, premium gear buyers, and newcomers entering the outdoor recreation market.",
  },
  {
    title: "Strong Show Opportunity",
    body:
      "A Denver-area powersports and outdoor recreation expo gives vendors direct access to motivated buyers before they make seasonal purchases.",
  },
];

const preparationSections = [
  {
    title: "Vendor Pre-Show Checklist",
    items: [
      "Hotel Reservations",
      "Booth Balance Due",
      "Colorado Sales Tax Registration",
    ],
    body:
      "Confirm your lodging, registration status and required tax setup before arriving so your team can focus on the show floor.",
  },
  {
    title: "Insurance Requirements",
    items: ["Proof of Insurance", "Insurance options", "ACORD form"],
    body:
      "Vendors should be prepared to provide proof of insurance and any requested ACORD documentation before move-in.",
  },
  {
    title: "Move-In Schedule",
    items: ["Move-in schedule", "Hall height restrictions"],
    body:
      "Plan your arrival around the official move-in schedule and review any hall height restrictions before bringing displays, vehicles or larger booth materials.",
  },
  {
    title: "Show Regulations",
    items: [
      "Booth requirements",
      "Staffing",
      "Use of space",
      "Liability",
      "Security",
      "Sound",
      "Cancellation",
    ],
    body:
      "Review the show requirements before arrival so your booth is staffed, contained within its assigned space and ready for a professional Expo weekend.",
  },
];

const resources = [
  {
    label: "Vendor Handbook (PDF)",
    href: "/documents/vendor-terms-and-conditions.pdf",
  },
  {
    label: "ACORD Form",
    href: "https://www.acord.org/standards-architecture/forms",
    external: true,
  },
  {
    label: "Colorado Sales Tax Information",
    href: "https://tax.colorado.gov/sales-tax-license",
    external: true,
  },
];

export const metadata = {
  title: "Become a Vendor | Colorado Snomo Expo",
  description:
    "Vendor registration and preparation resources for Colorado Snomo Expo.",
};

export default function VendorsPage() {
  return (
    <main className="vendors-page">
      <SiteHeader />

      <section className="vendors-market" aria-labelledby="vendors-market-title">
        <div className="vendors-market-heading">
          <p className="vendors-kicker">Vendor Opportunity</p>
          <h1 id="vendors-market-title">Why Exhibit in the Denver Front Range Market?</h1>
          <p>
            The Colorado Snomo Expo gives vendors direct access to one of the
            strongest outdoor recreation and powersports markets in the Rocky
            Mountain region.
          </p>
        </div>

        <div className="vendors-market-grid">
          {marketOpportunityCards.map((card, index) => (
            <article className="vendors-market-card" key={card.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vendors-section" aria-labelledby="vendor-center-title">
        <div className="vendors-section-heading">
          <p className="vendors-kicker">Vendor Registration Center</p>
          <h2 id="vendor-center-title">Everything you need to prepare for a successful Colorado Snomo Expo.</h2>
        </div>

        <div className="vendor-center-step vendor-center-step-primary">
          <div>
            <p className="vendors-kicker">Step 1</p>
            <h3>Complete Your Registration</h3>
            <p>
              Start by completing the official vendor registration form. Once
              your registration is submitted, use this page to prepare your
              booth, documents and arrival plan.
            </p>
          </div>
          <Link
            className="button button-primary"
            href="https://www.jotform.com/build/261379354993068"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register as a Vendor
          </Link>
        </div>

        <div className="vendor-center-step">
          <div className="vendor-center-step-heading">
            <p className="vendors-kicker">Step 2</p>
            <h3>Prepare for the Expo</h3>
            <p>
              Review each section before Expo weekend so your team knows what to
              bring, where to go and how to keep move-in simple.
            </p>
          </div>

          <div className="vendor-center-accordion">
            {preparationSections.map((section) => (
              <details key={section.title}>
                <summary>{section.title}</summary>
                <div>
                  <p>{section.body}</p>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}

            <details>
              <summary>Downloads &amp; Resources</summary>
              <div>
                <p>
                  Keep these resources close as you finalize your booth,
                  insurance and sales tax preparation.
                </p>
                <div className="vendor-center-resource-list">
                  {resources.map((resource) => (
                    <Link
                      className="button vendors-terms-link"
                      href={resource.href}
                      key={resource.label}
                      target={resource.external ? "_blank" : undefined}
                      rel={resource.external ? "noopener noreferrer" : undefined}
                    >
                      {resource.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
