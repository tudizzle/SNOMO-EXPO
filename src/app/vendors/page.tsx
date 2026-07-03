import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const whyExhibitPoints = [
  "Reach passionate snowmobile customers",
  "Showcase new products and services",
  "Connect with riders before the winter season begins",
  "Build brand awareness in the Rocky Mountain Region",
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

      <section className="vendors-registration" aria-labelledby="vendor-registration-title">
        <div>
          <p className="vendors-kicker">Vendor Registration</p>
          <h1 id="vendor-registration-title">Become a Vendor</h1>
          <p>
            Showcase your business at the Rocky Mountain Region&apos;s premier
            winter powersports event.
          </p>
        </div>

        <div className="vendors-registration-actions">
          <Link
            className="button button-primary"
            href="https://www.jotform.com/build/261379354993068"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register as a Vendor
          </Link>
          <Link
            className="button vendors-terms-link"
            href="/documents/vendor-terms-and-conditions.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Review Vendor Terms &amp; Conditions
          </Link>
        </div>
      </section>

      <section className="vendors-section" aria-labelledby="why-exhibit-title">
        <div className="vendors-section-heading">
          <p className="vendors-kicker">Why Exhibit</p>
          <h2 id="why-exhibit-title">Meet the Right Customers Before Winter Begins</h2>
        </div>

        <div className="vendors-list">
          {whyExhibitPoints.map((point) => (
            <p key={point}>{point}</p>
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
