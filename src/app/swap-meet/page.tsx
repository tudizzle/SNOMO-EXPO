import { SiteHeader } from "@/components/site-header";
import { SwapMeetForm } from "@/components/swap-meet-form";

const swapMeetDetails = [
  "Swap meet opens for setup at 7:00 AM Saturday morning.",
  "Spaces are available on a first come, first serve basis.",
  "There is typically plenty of room for swappers.",
  "A designated location will be available for individual sleds and larger trailer/truck setups.",
  "Extra vehicles should remain outside the swap area when possible.",
  "Display considerations may be made case by case.",
  "Payment is preferred in cash at the gate Saturday morning.",
  "Swap meet ends at 5:00 PM Saturday.",
  "Swappers should remove sleds and trailers immediately after the event.",
];

const pricingOptions = [
  {
    price: "$20",
    title: "Sled only",
    description: "Sled only in sled line, no trucks or trailers, includes 1 event ticket.",
  },
  {
    price: "$25",
    title: "Sled & Truck",
    description: "1 parking spot, includes 1 event ticket.",
  },
  {
    price: "$35",
    title: "Small space",
    description:
      "2 parking spots, typically accommodates a smaller 2-3 place trailer, includes 2 event tickets.",
  },
  {
    price: "$55",
    title: "Medium space",
    description:
      "4 parking spots, typically accommodates a medium 4-place trailer under 30 ft, includes 2 event tickets.",
  },
  {
    price: "$100",
    title: "Large trailer or RV",
    description: "Typically 30 ft+ trailers and RVs, includes 2 event tickets.",
  },
];

export const metadata = {
  title: "Swap Meet | Colorado Snomo Expo",
  description:
    "Get Colorado Snomo Expo swap meet details, pricing and information for getting on the swap meet list.",
};

export default function SwapMeetPage() {
  return (
    <main className="swap-meet-page">
      <SiteHeader />

      <section className="swap-meet-page-header" aria-labelledby="swap-meet-title">
        <p className="swap-meet-kicker">Colorado Snomo Expo</p>
        <h1 id="swap-meet-title">Swap Meet</h1>
        <p>
          Bring sleds, parts, gear and winter powersports equipment to the
          Colorado Snomo Expo swap meet.
        </p>
      </section>

      <section className="swap-meet-notice" aria-labelledby="swap-meet-date-title">
        <h2 id="swap-meet-date-title">Saturday, October 23rd</h2>
        <p>
          Event date: Saturday, October 23, 2026. The swap meet runs during the
          Saturday event day and gives individual swappers a clear place to sell
          sleds, parts, gear and larger trailer setups.
        </p>
      </section>

      <section className="swap-meet-content" aria-labelledby="swap-meet-info-title">
        <div className="swap-meet-section-heading">
          <p className="swap-meet-kicker">Details</p>
          <h2 id="swap-meet-info-title">What Swappers Need to Know</h2>
        </div>

        <div className="swap-meet-detail-list">
          {swapMeetDetails.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>
      </section>

      <section className="swap-meet-pricing" aria-labelledby="swap-meet-pricing-title">
        <div className="swap-meet-section-heading">
          <p className="swap-meet-kicker">Pricing</p>
          <h2 id="swap-meet-pricing-title">Swap Meet Spaces</h2>
        </div>

        <div className="swap-meet-pricing-list">
          {pricingOptions.map((option) => (
            <article className="swap-meet-price-row" key={`${option.price}-${option.title}`}>
              <div>
                <span>{option.price}</span>
                <h3>{option.title}</h3>
              </div>
              <p>{option.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="swap-meet-form-section" aria-labelledby="swap-meet-form-title">
        <div>
          <p className="swap-meet-kicker">Swappers</p>
          <h2 id="swap-meet-form-title">Get on the Swap Meet List</h2>
          <p>
            Tell us what you are planning to bring. Payment is preferred in cash
            at the gate Saturday morning.
          </p>
        </div>

        <SwapMeetForm />
      </section>
    </main>
  );
}
