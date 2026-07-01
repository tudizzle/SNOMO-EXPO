import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerWidth = "standard" | "wide" | "narrow";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  width = "standard",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  const containerClassName = ["ui-container", `ui-container-${width}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={containerClassName} {...props}>
      {children}
    </Component>
  );
}
