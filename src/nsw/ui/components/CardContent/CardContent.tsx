import clsx from "clsx";
import React from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode[] | React.ReactNode;
  component?: keyof React.ReactHTML;
}

const CardContent = React.forwardRef<HTMLElement, Props>(
  ({ children, className, component = "div", ...others }, ref) => {
    const classes = clsx("relative", "p-4", className);

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

CardContent.displayName = "CardContent";

export default CardContent;
