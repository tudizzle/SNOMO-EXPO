import type { ReactNode } from "react";

type HeroProps = {
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  kicker?: string;
  media?: ReactNode;
  subtitle?: string;
  title: string;
};

export function Hero({
  actions,
  children,
  className,
  kicker,
  media,
  subtitle,
  title,
}: HeroProps) {
  const heroClassName = ["ui-hero", className].filter(Boolean).join(" ");

  return (
    <section className={heroClassName}>
      {media ? <div className="ui-hero-media">{media}</div> : null}
      <div className="ui-hero-content">
        {kicker ? <p className="ui-eyebrow">{kicker}</p> : null}
        <h1 className="ui-hero-title">{title}</h1>
        {subtitle ? <p className="ui-hero-subtitle">{subtitle}</p> : null}
        {children}
        {actions ? <div className="ui-card-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
