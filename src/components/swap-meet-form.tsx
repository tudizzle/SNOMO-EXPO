"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function SwapMeetForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/swap-meet", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          plannedItems: formData.get("plannedItems"),
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
    <form className="swap-meet-form" onSubmit={handleSubmit}>
      <div className="swap-meet-field">
        <label htmlFor="swap-name">Name</label>
        <input id="swap-name" name="name" type="text" required />
      </div>

      <div className="swap-meet-field">
        <label htmlFor="swap-email">Email Address</label>
        <input id="swap-email" name="email" type="email" required />
      </div>

      <div className="swap-meet-field">
        <label htmlFor="swap-phone">Phone Number</label>
        <input id="swap-phone" name="phone" type="tel" required />
      </div>

      <div className="swap-meet-field">
        <label htmlFor="swap-items">What are you planning to sell?</label>
        <textarea id="swap-items" name="plannedItems" rows={5} required />
      </div>

      <button className="button button-primary" type="submit" disabled={formState === "submitting"}>
        {formState === "submitting" ? "Sending..." : "Get on the List"}
      </button>

      {formState === "success" ? (
        <p className="swap-meet-form-success" role="status">
          Thanks — we received your swap meet information and will be in touch.
        </p>
      ) : null}

      {formState === "error" ? (
        <p className="swap-meet-form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
