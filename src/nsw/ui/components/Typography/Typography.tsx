import clsx from "clsx";
import React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TypographyProps extends React.HtmlHTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: keyof React.ReactHTML;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ children, className, component = "p", variant, ...others }, ref) => {
    const typographyVariant = clsx(
      // "block antialiased tracking-normal text-inherit",
      {
        ["text-5xl font-semibold leading-tight"]: variant === "h1",
        ["text-4xl font-semibold leading-[1.3]"]: variant === "h2",
        ["text-3xl font-semibold leading-snug"]: variant === "h3",
        ["text-2xl font-semibold leading-snug"]: variant === "h4",
        ["text-xl font-semibold leading-snug"]: variant === "h5",
        ["text-base font-semibold leading-relaxed capitalize"]:
          variant === "h6",
      },
      className,
    );

    return React.createElement(
      component,
      {
        ...others,
        ref,
        className: typographyVariant,
      },
      children,
    );
  },
);

Typography.displayName = "Typography";

export default Typography;
