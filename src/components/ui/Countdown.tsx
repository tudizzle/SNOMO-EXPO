type CountdownItem = {
  label: string;
  value: string | number;
};

type CountdownProps = {
  eyebrow?: string;
  items: CountdownItem[];
};

export function Countdown({ eyebrow, items }: CountdownProps) {
  return (
    <section className="ui-countdown" aria-label={eyebrow ?? "Countdown"}>
      {eyebrow ? <p className="ui-eyebrow">{eyebrow}</p> : null}
      <dl className="ui-countdown-list">
        {items.map((item) => (
          <div className="ui-countdown-item" key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
