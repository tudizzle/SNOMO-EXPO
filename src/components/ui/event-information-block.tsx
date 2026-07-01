type EventInformationItem = {
  label: string;
  value: string;
};

type EventInformationBlockProps = {
  eyebrow?: string;
  items: EventInformationItem[];
};

export function EventInformationBlock({ eyebrow, items }: EventInformationBlockProps) {
  return (
    <section className="ui-event-info" aria-label={eyebrow ?? "Event information"}>
      {eyebrow ? <p className="ui-eyebrow">{eyebrow}</p> : null}
      <dl className="ui-event-info-list">
        {items.map((item) => (
          <div className="ui-event-info-row" key={`${item.label}-${item.value}`}>
            <dt className="ui-event-info-label">{item.label}</dt>
            <dd className="ui-event-info-value">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
