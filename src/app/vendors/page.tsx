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
    title: "Accommodations",
    content: (
      <div className="vendor-accommodations-panel">
        <div className="vendor-accommodations-heading">
          <p className="vendors-kicker">Official Recommended Hotel</p>
          <h4>Residence Inn Denver Central Park</h4>
          <p>
            4667 North Central Park Boulevard
            <br />
            Denver, Colorado
          </p>
          <p>Located just minutes from the National Western Complex.</p>
        </div>

        <div className="vendor-accommodations-details">
          <div>
            <p className="vendors-kicker">Special Event Rate</p>
            <p>
              Mention <strong>Colorado Snomo Expo</strong> when making your
              reservation to receive the special event rate, subject to
              availability.
            </p>
          </div>

          <div>
            <p className="vendors-kicker">Hotel Features</p>
            <ul>
              {[
                "Complimentary Breakfast",
                "Free Wi-Fi",
                "Free Parking",
                "Spacious Studio & Suite Rooms",
                "Minutes from the National Western Complex",
              ].map((feature) => (
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

          <p className="vendor-accommodations-note">
            Rooms are limited. We recommend booking early to secure the Colorado
            Snomo Expo event rate.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Insurance Requirements",
    content: (
      <div className="vendor-accordion-panel">
        <div className="vendor-accordion-panel-heading">
          <p className="vendors-kicker">Required Before Move-In</p>
          <h4>Insurance Requirements</h4>
          <p>All vendors must provide proof of insurance before move-in can begin.</p>
          <p>
            Vendors may purchase single-event insurance through the third-party
            insurer linked below, or they may use their own insurance provider.
          </p>
          <p className="vendor-accordion-note">
            Proof of insurance must be provided before any move-in can begin.
          </p>
        </div>

        <div className="vendor-accordion-panel-details">
          <div>
            <p className="vendors-kicker">Complete By</p>
            <h5>October 11, 2026</h5>
          </div>
          <Link
            className="button button-primary"
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
      </div>
    ),
  },
  {
    title: "Show Regulations",
    content: (
      <div className="vendor-accordion-panel">
        <div className="vendor-accordion-panel-heading">
          <p className="vendors-kicker">Expo Weekend</p>
          <h4>Show Regulations</h4>
          <p>
            Review these key show rules before arrival. Full regulations are
            available in the Show Regulations PDF.
          </p>
          <div>
            <p className="vendors-kicker">Booth Setup</p>
            <ul>
              <li>Standard booths are 10&apos; x 10&apos; unless otherwise noted.</li>
              <li>Booths include an 8&apos; high back drape.</li>
              <li>
                Booths may not block neighboring exhibitors or extend into aisles.
              </li>
              <li>
                Special booth needs or non-standard booth sizes must be approved
                by show management in advance.
              </li>
            </ul>
          </div>
          <div>
            <p className="vendors-kicker">Booth Materials</p>
            <ul>
              <li>Booth decorations must comply with fire regulations.</li>
              <li>Banners may not be hung from Expo Hall conduit pipes.</li>
              <li>Propane tanks are not permitted in Expo Hall.</li>
              <li>Fuel tanks must be empty or properly secured.</li>
              <li>No decals or stickers are allowed on walls or rented tables.</li>
            </ul>
          </div>
          <div>
            <p className="vendors-kicker">Staffing &amp; Access</p>
            <ul>
              <li>Booths must be open and staffed during all show hours.</li>
              <li>
                Only staff members with proper show credentials may work booths.
              </li>
              <li>
                Exhibitors may enter the show floor one hour before opening with
                proper credentials.
              </li>
            </ul>
          </div>
        </div>

        <div className="vendor-accordion-panel-details">
          <div>
            <p className="vendors-kicker">Important Reminders</p>
            <h5>Be Ready Before Doors Open</h5>
            <p className="vendor-accordion-note">
              The Colorado SnoMo Expo opens Friday, October 23, 2026 at 4:00 PM.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Insurance Required</p>
            <p>
              All exhibitors must carry general liability insurance for the
              duration of the event. Proof of insurance must be provided before
              move-in can begin.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Security</p>
            <p>
              Security will be onsite during the show, but exhibitors remain
              responsible for their booth materials, displays, and equipment.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Labor</p>
            <p>Exhibitors may assemble and dismantle their own booths.</p>
          </div>
          <div>
            <p className="vendors-kicker">Sound Levels</p>
            <p>
              Sound must be kept at a level that does not disturb neighboring
              exhibitors.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Cancellations</p>
            <p>
              All cancellations must be submitted in writing and are subject to
              the terms outlined in the official show regulations.
            </p>
          </div>
          <Link
            className="button button-primary"
            href="/documents/colorado-snomo-expo-vendor-show-regulations.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD SHOW REGULATIONS
          </Link>
        </div>
      </div>
    ),
  },
];

const showtimeSections = [
  {
    title: "General Info",
    content: (
      <div className="vendor-accordion-panel">
        <div className="vendor-accordion-panel-heading">
          <p className="vendors-kicker">2026 Colorado SnoMo Expo</p>
          <h4>General Info</h4>
          <div>
            <p className="vendors-kicker">Main Show Contact</p>
            <p>
              <strong>Brandon Cox</strong>
              <br />
              719-963-9782
              <br />
              <a href="mailto:tudizzle@gmail.com">tudizzle@gmail.com</a>
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Event Location</p>
            <p>
              <strong>National Western Complex</strong>
              <br />
              4655 Humboldt St.
              <br />
              Denver, CO 80216
            </p>
            <Link
              className="button vendors-terms-link"
              href="https://nationalwesterncomplex.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Western Complex
            </Link>
          </div>
          <div>
            <p className="vendors-kicker">Show Dates</p>
            <ul>
              <li>
                <strong>Friday, October 23, 2026</strong> — 4:00 PM to 8:00 PM
              </li>
              <li>
                <strong>Saturday, October 24, 2026</strong> — 9:00 AM to 5:00 PM
              </li>
            </ul>
          </div>
          <div>
            <p className="vendors-kicker">Internet Service</p>
            <p>Wi-Fi access is provided free of charge.</p>
            <p>The password will be provided at vendor check-in onsite.</p>
          </div>
          <div>
            <p className="vendors-kicker">Parking</p>
            <p>Follow signage and event staff directions for vendor parking during the show.</p>
          </div>
          <div>
            <p className="vendors-kicker">Wristbands</p>
            <p>
              Each vendor will be provided with <strong>6 wristbands</strong>{" "}
              good for access to both days of the event.
            </p>
            <p>
              If you need additional wristbands to meet your staffing needs,
              please request them during vendor check-in.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Denver Sales Tax</p>
            <p>
              Denver sales tax rate: <strong>8.81%</strong>
            </p>
          </div>
        </div>

        <div className="vendor-accordion-panel-details">
          <div>
            <p className="vendors-kicker">Vehicle Rules</p>
            <p className="vendor-accordion-note">
              Vehicles cannot be parked inside the event while the show is open.
            </p>
            <p>
              All non-display vehicles must be out of the building by{" "}
              <strong>Friday at 2:00 PM</strong> and will not be permitted to
              enter again until <strong>Saturday after 5:00 PM</strong>.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Floor Protection</p>
            <p>
              The National Western Complex has a polished concrete floor with no
              coverings. We recommend removing all carbides from any snowmobile
              that will be on display and using care during setup and breakdown
              to avoid damaging the floor.
            </p>
            <p>Vendors are responsible for any damages.</p>
          </div>
          <div>
            <p className="vendors-kicker">Vendor Courtesy</p>
            <p>
              When setting up your booth, please be respectful of your fellow
              vendors and minimize blocking access through the event.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Security</p>
            <p>
              Private security will be onsite during move-in, throughout the
              show, and until breakdown is complete.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Breakdown</p>
            <p>
              Breakdown begins immediately following the Expo and must be
              completed by <strong>11:30 PM on Saturday, October 24, 2026</strong>.
            </p>
          </div>
          <div>
            <p className="vendors-kicker">Emergency Information</p>
            <p>
              For emergencies, call <strong>911</strong>.
            </p>
            <p>
              The National Western Complex is located one block from Denver Fire
              Department Station 9, which offers EMT and first-responder care to
              the facility.
            </p>
            <ul>
              <li>
                <strong>Denver Fire Department — Station 9</strong>
                <br />
                720-913-3473
              </li>
              <li>
                <strong>EMS — Stadium Medical</strong>
                <br />
                720-630-2000
              </li>
              <li>
                <strong>Denver Police Department — District 2</strong>
                <br />
                720-913-1000
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Move-In Schedule",
    content: (
      <div className="vendor-accordion-panel">
        <div className="vendor-accordion-panel-heading">
          <p className="vendors-kicker">Vendor Arrival</p>
          <h4>Move-In Schedule</h4>
          <p>
            Please review your move-in window before arriving and be aware of
            which room your booth is located in.
          </p>
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
        </div>

        <div className="vendor-accordion-panel-details">
          <div>
            <p className="vendors-kicker">Height Restrictions</p>
            <h5>Know Your Room</h5>
            <p>Review the height restrictions for your booth location before arriving.</p>
          </div>
          <ul>
            <li>
              <strong>Hall of Education</strong> — 10&apos; 6&quot;
            </li>
            <li>
              <strong>Expo Hall</strong> — 13&apos; 6&quot;
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];

const resources = [
  {
    label: "TERMS AND CONDITIONS",
    href: "/documents/colorado-snomo-expo-vendor-terms-and-conditions.pdf",
  },
  {
    label: "ACORD Form",
    href: "https://www.acord.org/standards-architecture/forms",
    external: true,
  },
  {
    label: "Colorado Sales Tax Information",
    href: "https://tax.colorado.gov/sales-tax-guide",
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
              bring and which documents to have ready.
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
                <div className="vendor-accordion-panel">
                  <div className="vendor-accordion-panel-heading">
                    <p className="vendors-kicker">Vendor Resources</p>
                    <h4>Downloads &amp; Resources</h4>
                    <p>
                      Keep these resources close as you finalize your booth,
                      insurance, and show preparation.
                    </p>
                  </div>

                  <div className="vendor-accordion-panel-details">
                    <p className="vendors-kicker">Documents</p>
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
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="vendor-center-step">
          <div className="vendor-center-step-heading">
            <p className="vendors-kicker">Step 3</p>
            <h3>It&apos;s Showtime</h3>
            <p>
              Final move-in details, show weekend reminders, and arrival
              information for Expo weekend.
            </p>
          </div>

          <div className="vendor-center-accordion">
            {showtimeSections.slice().reverse().map((section) => (
              <details key={section.title}>
                <summary>{section.title}</summary>
                <div>{section.content}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
