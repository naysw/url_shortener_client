import clsx from "clsx";
import React from "react";

type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | boolean;

export interface ContainerProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode[] | React.ReactNode;
  component?: keyof React.ReactHTML;
  maxWidth?: MaxWidth;
}

const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ children, className, component = "div", maxWidth, ...others }, ref) => {
    const classes = clsx(
      "container mx-auto px-4",
      {
        ["max-w-3xl"]: maxWidth === "sm",
        ["max-w-4xl"]: maxWidth === "md",
        ["max-w-6xl"]: maxWidth === "lg",
        ["max-w-7xl"]: maxWidth === "xl",
      },
      className
    );

    return React.createElement(
      component,
      {
        ...others,
        ref,
        className: classes,
      },
      children
    );
  }
);

Container.displayName = "UI.Container";

export default Container;
