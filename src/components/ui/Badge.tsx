import type { ReactNode } from "react";

type BadgeTone = "neutral" | "red" | "gold";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
};

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  const badgeClassName = ["ui-badge", `ui-badge-${tone}`, className]
    .filter(Boolean)
    .join(" ");

  return <span className={badgeClassName}>{children}</span>;
}
