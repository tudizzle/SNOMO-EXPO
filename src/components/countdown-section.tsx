export function CountdownSection() {
  return (
    <section className="countdown-section" aria-label="Countdown to Colorado Snomo Expo">
      <svg className="countdown-mountains" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 126L104 82L174 104L286 48L384 94L492 28L612 108L704 70L814 122L930 46L1046 100L1138 58L1248 112L1340 76L1440 122V180H0V126Z" />
      </svg>
      <div className="countdown-snow" aria-hidden="true" />
      <div className="countdown-inner">
        <p className="countdown-eyebrow">THE MOUNTAINS ARE CALLING</p>
        <div className="countdown-display" aria-label="114 days until the gates open">
          <span className="countdown-number">114</span>
        </div>
        <p className="countdown-support">DAYS UNTIL THE GATES OPEN</p>
      </div>
    </section>
  );
}
