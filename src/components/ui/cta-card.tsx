import type { ReactNode } from "react";

type CtaCardProps = {
  eyebrow?: string;
  title: string;
  copy: string;
  actions: ReactNode;
};

export function CtaCard({ eyebrow, title, copy, actions }: CtaCardProps) {
  return (
    <aside className="ui-card ui-cta-card">
      <div className="ui-stack-md">
        {eyebrow ? <p className="ui-eyebrow">{eyebrow}</p> : null}
        <h3 className="ui-card-title">{title}</h3>
        <p className="ui-card-copy">{copy}</p>
      </div>
      <div className="ui-card-actions">{actions}</div>
    </aside>
  );
}
