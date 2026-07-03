import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const preparationSections = [
  {
    title: "Pre-Show Checklist",
    items: [
      "Hotel Reservations",
      "Booth Balance Due",
      "Colorado Sales Tax Registration",
    ],
    body:
      "Confirm your lodging, registration status and required tax setup before arriving so your team can focus on the show floor.",
  },
  {
    title: "Insurance",
    items: ["Proof of Insurance", "Insurance options", "ACORD form"],
    body:
      "Vendors should be prepared to provide proof of insurance and any requested ACORD documentation before move-in.",
  },
  {
    title: "Move-In",
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
    label: "Download Vendor Handbook (PDF)",
    href: "/documents/vendor-terms-and-conditions.pdf",
  },
  {
    label: "Download ACORD Form",
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
  title: "Vendor Success Center | Colorado Snomo Expo",
  description:
    "Everything vendors need to prepare for a successful Colorado Snomo Expo.",
};

export default function VendorSuccessPage() {
  return (
    <main className="vendor-success-page">
      <SiteHeader />

      <section className="vendor-success-hero" aria-labelledby="vendor-success-title">
        <p className="vendor-success-kicker">Vendor Resources</p>
        <h1 id="vendor-success-title">Vendor Success Center</h1>
        <p>
          Everything you need to prepare for a successful Colorado Snomo Expo.
        </p>
      </section>

      <section className="vendor-success-step vendor-success-step-primary" aria-labelledby="vendor-success-registration-title">
        <div>
          <p className="vendor-success-kicker">Step 1</p>
          <h2 id="vendor-success-registration-title">Complete Your Registration</h2>
          <p>
            Start by completing the official vendor registration form. Once your
            registration is submitted, use this page to prepare your booth,
            documents and arrival plan.
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
      </section>

      <section className="vendor-success-step" aria-labelledby="vendor-success-prepare-title">
        <div className="vendor-success-section-heading">
          <p className="vendor-success-kicker">Step 2</p>
          <h2 id="vendor-success-prepare-title">Prepare for the Expo</h2>
          <p>
            Review each section before Expo weekend so your team knows what to
            bring, where to go and how to keep move-in simple.
          </p>
        </div>

        <div className="vendor-success-accordion">
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
            <summary>Resources</summary>
            <div>
              <p>
                Keep these resources close as you finalize your booth, insurance
                and sales tax preparation.
              </p>
              <div className="vendor-success-resource-list">
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
      </section>
    </main>
  );
}
