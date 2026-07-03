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
    content: (
      <>
        <p>
          <strong>Hotel Reservations</strong>
        </p>
        <p>
          We have a block of rooms reserved for vendors at the{" "}
          <strong>Residence Inn by Marriott Denver Central Park</strong>.
        </p>
        <p>
          Vendors can book using the group reservation link below or call the
          hotel directly and mention <strong>Colorado SnoMo Expo</strong> to
          receive the group rate.
        </p>
        <p>
          <strong>Group rate:</strong> $XXX per night
        </p>
        <p>
          <strong>Residence Inn by Marriott Denver Central Park</strong>
          <br />
          4667 North Central Park Boulevard
          <br />
          Denver, CO
          <br />
          (303) 373-3960
        </p>
        <Link
          className="button vendors-terms-link"
          href="https://www.marriott.com/en-us/hotels/denre-residence-inn-denver-central-park/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book your group rate for Colorado SnoMo Expo 2025"
        >
          Book Your Group Rate
        </Link>

        <p>
          <strong>Booth Balance Due</strong>
        </p>
        <p>
          If you placed a deposit for your booth space, the remaining balance is
          due by <strong>August 31, 2026</strong>.
        </p>
        <p>
          Payment may be completed by check or credit card through your Vendor
          Agreement.
        </p>
        <p>
          <strong>Due: August 31, 2026</strong>
        </p>

        <p>
          <strong>Colorado Sales Tax Registration</strong>
        </p>
        <p>
          Any out-of-state retailer must apply for a Colorado Sales Tax License
          and collect Colorado sales tax.
        </p>
        <p>
          Online applications for a Sales Tax License for out-of-state retailers
          are available through <strong>Colorado Revenue Online</strong>.
        </p>
        <p>
          Vendors should complete registration before the Colorado SnoMo Expo and
          report sales after the event.
        </p>
        <p>
          <strong>Complete by: October 4, 2026</strong>
        </p>
        {/* TODO: Add Colorado Revenue Online link and sales tax registration forms. */}
      </>
    ),
  },
  {
    title: "Insurance Requirements",
    content: (
      <>
        <p>All vendors must provide proof of insurance before move-in can begin.</p>
        <p>
          Vendors may purchase single-event insurance through the third-party
          insurer linked below, or they may use their own insurance provider.
        </p>
        <div className="vendor-center-resource-list">
          <Link
            className="button vendors-terms-link"
            href="https://app.actinsurance.com/policy/buy/ai/OTYxMg=="
            target="_blank"
            rel="noopener noreferrer"
          >
            Purchase Single-Event Insurance
          </Link>
          <Link
            className="button vendors-terms-link"
            href="https://coloradosnomoexpo.com/acord-insurance-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download ACORD Liability Certificate
          </Link>
        </div>
        <p>
          <strong>
            Proof of insurance must be provided before any move-in can begin.
          </strong>
        </p>
        <p>
          <strong>Complete by: October 11, 2026</strong>
        </p>
      </>
    ),
  },
  {
    title: "Move-In Schedule",
    content: (
      <>
        <p>Vendor move-in times are:</p>
        <ul>
          <li>
            <strong>Wednesday, October 21</strong> — By appointment only
          </li>
          <li>
            <strong>Thursday, October 22</strong> — 10:00 AM to 4:00 PM
          </li>
          <li>
            <strong>Friday, October 23</strong> — 9:00 AM to 2:00 PM
          </li>
        </ul>
        <p>
          Please be aware of which room your booth is located in and review the
          height restrictions before arriving.
        </p>
        <p>Height restrictions:</p>
        <ul>
          <li>
            <strong>Hall of Education</strong> — 10&apos; 6&quot;
          </li>
          <li>
            <strong>Expo Hall</strong> — 13&apos; 6&quot;
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Show Regulations",
    content: (
      <>
        <p>The Colorado SnoMo Expo opens to the public on:</p>
        <p>
          <strong>Friday, October 23, 2026 at 4:00 PM</strong>
        </p>
        <ul>
          <li>Booth requirements</li>
          <li>Staffing</li>
          <li>Use of space</li>
          <li>Liability</li>
          <li>Security</li>
          <li>Sound</li>
          <li>Cancellation</li>
        </ul>
      </>
    ),
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
                <div>{section.content}</div>
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
