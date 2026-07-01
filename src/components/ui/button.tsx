import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonLinkProps = SharedButtonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type DesignButtonProps = ButtonProps | ButtonLinkProps;

function getButtonClassName(variant: ButtonVariant, className?: string) {
  return ["ui-button", `ui-button-${variant}`, className].filter(Boolean).join(" ");
}

export function DesignButton({
  children,
  className,
  variant = "primary",
  ...props
}: DesignButtonProps) {
  const buttonClassName = getButtonClassName(variant, className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link className={buttonClassName} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

export function PrimaryButton(props: Omit<DesignButtonProps, "variant">) {
  return <DesignButton variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<DesignButtonProps, "variant">) {
  return <DesignButton variant="secondary" {...props} />;
}
