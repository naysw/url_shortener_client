import clsx from "clsx";
import React from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode[] | React.ReactNode;
  component?: keyof React.ReactHTML;
  container?: boolean;
  item?: boolean;
  spacing?: number;
}

const Grid = React.forwardRef<HTMLElement, Props>(
  (
    {
      children,
      className,
      component = "div",
      container,
      item,
      spacing,
      ...others
    },
    ref
  ) => {
    const classes = clsx(container ? "grid grid-cols-12" : "", className);

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

Grid.displayName = "Grid";

export default Grid;
