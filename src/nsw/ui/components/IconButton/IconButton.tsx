import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentProps<"button"> {
  children?: React.ReactNode[] | React.ReactNode;
  component?: keyof React.ReactHTML;
}

const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className, component = "button", ...others }, ref) => {
    const classes = clsx(
      "cursor-pointer p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out",
      className,
    );

    return React.createElement(
      component,
      {
        ...others,
        ref,
        className: classes,
      },
      children,
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
