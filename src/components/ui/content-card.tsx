import type { ReactNode } from "react";

type ContentCardProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function ContentCard({ eyebrow, title, children, actions }: ContentCardProps) {
  return (
    <article className="ui-card ui-content-card">
      <div className="ui-stack-sm">
        {eyebrow ? <p className="ui-eyebrow">{eyebrow}</p> : null}
        <h3 className="ui-card-title">{title}</h3>
      </div>
      <div className="ui-card-copy">{children}</div>
      {actions ? <div className="ui-card-actions">{actions}</div> : null}
    </article>
  );
}
