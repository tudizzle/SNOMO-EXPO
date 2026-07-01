"use client";

import { useEffect, useState } from "react";

const eventDate = new Date("2026-10-23T00:00:00-06:00");

function getDaysRemaining() {
  const today = new Date();
  const difference = eventDate.getTime() - today.getTime();

  return Math.max(0, Math.ceil(difference / 86_400_000));
}

export function CountdownSection() {
  const [daysRemaining, setDaysRemaining] = useState(getDaysRemaining);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDaysRemaining(getDaysRemaining());
    }, 3_600_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section" aria-label="Countdown to Colorado Snomo Expo">
      <div className="countdown-snow" aria-hidden="true" />
      <div className="countdown-inner">
        <p className="countdown-eyebrow">The Mountains Are Calling</p>
        <div className="countdown-display" aria-label={`${daysRemaining} days until the gates open`}>
          <span className="countdown-number">{daysRemaining}</span>
          <span className="countdown-label">Days</span>
        </div>
        <p className="countdown-support">Until the Gates Open</p>
      </div>
    </section>
  );
}
