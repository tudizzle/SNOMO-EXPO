type SectionHeadingProps = {
  kicker?: string;
  title: string;
  copy?: string;
  id?: string;
};

export function SectionHeading({ kicker, title, copy, id }: SectionHeadingProps) {
  return (
    <header className="ui-section-heading" id={id}>
      {kicker ? <p className="ui-section-kicker">{kicker}</p> : null}
      <h2 className="ui-section-title">{title}</h2>
      {copy ? <p className="ui-section-copy">{copy}</p> : null}
    </header>
  );
}
