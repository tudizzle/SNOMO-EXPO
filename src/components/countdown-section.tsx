"use client";

import { useEffect, useState } from "react";

const EVENT_START_TIME = new Date("2026-10-23T22:00:00.000Z").getTime();

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOpen: boolean;
};

function getRemainingTime(): CountdownTime {
  const remainingMilliseconds = Math.max(0, EVENT_START_TIME - Date.now());
  const totalSeconds = Math.floor(remainingMilliseconds / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isOpen: remainingMilliseconds === 0,
  };
}

export function CountdownSection() {
  const [remaining, setRemaining] = useState<CountdownTime>(() => getRemainingTime());
  const countdownItems = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  useEffect(() => {
    const updateCountdown = () => setRemaining(getRemainingTime());
    const intervalId = window.setInterval(updateCountdown, 1000);

    updateCountdown();

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="countdown-section" aria-label="Countdown to Colorado Snomo Expo">
      <svg className="countdown-mountains" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 126L104 82L174 104L286 48L384 94L492 28L612 108L704 70L814 122L930 46L1046 100L1138 58L1248 112L1340 76L1440 122V180H0V126Z" />
      </svg>
      <div className="countdown-snow" aria-hidden="true" />
      <div className="countdown-inner">
        <p className="countdown-eyebrow">THE MOUNTAINS ARE CALLING</p>
        {remaining.isOpen ? (
          <div className="countdown-open" role="status">
            The Expo Is Open
          </div>
        ) : (
          <div
            className="countdown-display"
            aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds until the gates open`}
            suppressHydrationWarning
          >
            {countdownItems.map((item) => (
              <div className="countdown-unit" key={item.label}>
                <span className="countdown-number" suppressHydrationWarning>
                  {item.label === "Days" ? item.value : String(item.value).padStart(2, "0")}
                </span>
                <span className="countdown-label">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        <p className="countdown-support">UNTIL THE GATES OPEN</p>
      </div>
    </section>
  );
}
