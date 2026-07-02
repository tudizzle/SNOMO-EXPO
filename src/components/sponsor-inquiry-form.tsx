"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const opportunityOptions = [
  "Marketing Materials",
  "Event Signage",
  "Parking Lot Sponsor",
  "Passport Card Promotion",
  "Giveaway Sponsor",
  "Prize Donation",
  "Custom Sponsorship",
];

export function SponsorInquiryForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const opportunities = formData
      .getAll("opportunities")
      .filter((opportunity): opportunity is string => typeof opportunity === "string");

    if (opportunities.length === 0) {
      setFormState("error");
      setErrorMessage("Please select at least one sponsorship opportunity.");
      return;
    }

    try {
      const response = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        body: JSON.stringify({
          companyName: formData.get("companyName"),
          contactName: formData.get("contactName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          website: formData.get("website"),
          opportunities,
          additionalInformation: formData.get("additionalInformation"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setFormState("error");
        setErrorMessage("Something went wrong. Please try again.");
        return;
      }
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    form.reset();
    setFormState("success");
  }

  return (
    <form className="sponsor-inquiry-form" onSubmit={handleSubmit}>
      <div className="sponsor-inquiry-field">
        <label htmlFor="sponsor-company">Company Name *</label>
        <input id="sponsor-company" name="companyName" type="text" required />
      </div>

      <div className="sponsor-inquiry-field">
        <label htmlFor="sponsor-contact">Contact Name *</label>
        <input id="sponsor-contact" name="contactName" type="text" required />
      </div>

      <div className="sponsor-inquiry-field">
        <label htmlFor="sponsor-email">Email Address *</label>
        <input id="sponsor-email" name="email" type="email" required />
      </div>

      <div className="sponsor-inquiry-field">
        <label htmlFor="sponsor-phone">Phone Number</label>
        <input id="sponsor-phone" name="phone" type="tel" />
      </div>

      <div className="sponsor-inquiry-field">
        <label htmlFor="sponsor-website">Website</label>
        <input id="sponsor-website" name="website" type="url" />
      </div>

      <fieldset className="sponsor-inquiry-field sponsor-inquiry-checklist">
        <legend>Sponsorship Opportunities of Interest *</legend>
        <div>
          {opportunityOptions.map((opportunity) => (
            <label key={opportunity}>
              <input name="opportunities" type="checkbox" value={opportunity} />
              <span>{opportunity}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sponsor-inquiry-field">
        <label htmlFor="sponsor-additional">Additional Information</label>
        <textarea
          id="sponsor-additional"
          name="additionalInformation"
          placeholder="Tell us about your business or the type of sponsorship opportunity you're interested in."
          rows={6}
        />
      </div>

      <button className="button button-primary" type="submit" disabled={formState === "submitting"}>
        {formState === "submitting" ? "Sending..." : "Send Sponsorship Inquiry"}
      </button>

      {formState === "success" ? (
        <p className="sponsor-inquiry-form-success" role="status">
          Thank you! We&apos;ve received your sponsorship inquiry and will contact
          you soon to discuss opportunities for the 2026 Colorado Snomo Expo.
        </p>
      ) : null}

      {formState === "error" ? (
        <p className="sponsor-inquiry-form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
