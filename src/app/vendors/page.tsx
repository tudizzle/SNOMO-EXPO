import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/seo";

const marketOpportunityCards = [
  {
    title: "Large Regional Audience",
    body:
      "A 100-mile radius around Denver reaches Colorado snowmobile riders, mountain families, clubs, dealers, manufacturers, and winter powersports buyers across the Front Range.",
  },
  {
    title: "High-Value Customer Base",
    body:
      "The market includes a strong base of snowmobile owners and winter recreation customers who invest in sleds, trailers, parts, gear, apparel, accessories, and performance upgrades.",
  },
  {
    title: "Strong Buying Demographics",
    body:
      "Core attendees are typically active snowmobile riders and outdoor families ages 25–55, with many households earning $75,000–$200,000+ annually.",
  },
  {
    title: "Outdoor Lifestyle Market",
    body:
      "Front Range consumers actively participate in mountain snowmobiling, trail riding, skiing, camping, hunting, fishing, and year-round outdoor adventure.",
  },
  {
    title: "Truck, Trailer & Gear Ownership",
    body:
      "Snowmobile customers often own trucks, enclosed trailers, avalanche gear, riding apparel, tools, storage systems, and premium winter powersports equipment.",
  },
  {
    title: "Prime Geographic Reach",
    body:
      "The Expo draws snowmobile riders from Denver, Colorado Springs, Boulder, Fort Collins, Loveland, Greeley, and the mountain gateway communities that feed Colorado’s riding areas.",
  },
  {
    title: "Multiple Customer Segments",
    body:
      "Vendors can reach mountain riders, trail riders, families, clubs, dealers, new riders, performance enthusiasts, and winter adventure customers in one focused event.",
  },
  {
    title: "Strong Show Opportunity",
    body:
      "A Denver-area snowmobile and winter powersports expo gives vendors direct access to motivated buyers before the season’s biggest purchasing decisions.",
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
            href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1785882938883&key=GRP&app=resvlink&_branch_match_id=1618329749637114502&_branch_referrer=H4sIAAAAAAAAAxXLSw5AMBAA0Nt0qUHEkDSWtsIBpBhMfNpMG42Ns2P%2F3uq9daWU2tro0MxkvI9Gc0hGdxGGpKJJxTlkAEmRAkAqNrxV3TbiK%2BpXO52beBhn%2FPq59AOb4JBVp2fN9ALv60GTYQAAAA%3D%3D"
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
            download="colorado-snomo-expo-acord-insurance-form.pdf"
            href="/documents/colorado-snomo-expo-acord-insurance-form.pdf"
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
    title: "Show Times",
    content: (
      <div className="vendor-accordion-panel">
        <div className="vendor-accordion-panel-heading">
          <p className="vendors-kicker">Expo Weekend</p>
          <h4>Show Times</h4>
          <p>
            The Colorado SnoMo Expo is open to the public during the following
            times.
          </p>
        </div>

        <div className="vendor-accordion-panel-details">
          <div>
            <p className="vendors-kicker">Friday, October 23, 2026</p>
            <h5>4:00 PM to 8:00 PM</h5>
          </div>
          <div>
            <p className="vendors-kicker">Saturday, October 24, 2026</p>
            <h5>9:00 AM to 5:00 PM</h5>
          </div>
          <p className="vendor-accordion-note">
            Vendors should have booths fully set, staffed, and ready before
            doors open each day.
          </p>
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
    href: "/documents/colorado-snomo-expo-acord-insurance-form.pdf",
    download: "colorado-snomo-expo-acord-insurance-form.pdf",
  },
  {
    label: "Colorado Sales Tax Information",
    href: "https://tax.colorado.gov/sales-tax-guide",
    external: true,
  },
];

export const metadata = createPageMetadata({
  title: "Become a Vendor | Colorado Snomo Expo",
  description:
    "Vendor registration and preparation resources for Colorado Snomo Expo.",
  path: "/vendors",
});

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
            <h3>REGISTRATION IS CLOSED</h3>
            <p>
              Vendor registration for the 2026 Colorado SnoMo Expo is closed.
            </p>
          </div>
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
                          download={resource.download}
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
