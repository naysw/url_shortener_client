import clsx from "clsx";
import React from "react";

type ButtonVariant = "contained" | "outlined";

type ButtonSize = "small" | "medium" | "large";

interface Props extends React.ComponentProps<"button"> {
  children?: React.ReactNode[] | React.ReactNode;
  component?: keyof React.ReactHTML;
  variant?: ButtonVariant;

  /**
   *
   */
  fullWidth?: boolean;

  /**
   * button size
   *
   * @default medium
   */
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      component = "button",
      disabled,
      fullWidth,
      size = "medium",
      startIcon,
      endIcon,
      loading = false,
      ...others
    },
    ref,
  ) => {
    const classes = clsx(
      fullWidth && "w-full",
      "uppercase font-bold rounded",
      disabled &&
        "bg-gray-600 bg-opacity-40 text-gray-400 border-transparent pointer-events-none",
      {
        ["px-2 py-1"]: size === "small",
        ["px-4 py-2"]: size === "medium",
        ["px-6 py-4"]: size === "large",
      },
      startIcon || endIcon ? "flex items-center" : "",
      className,
    );

    return React.createElement(
      component,
      {
        ...others,
        ref,
        className: classes,
      },
      <>
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </>,
    );
  },
);

Button.displayName = "Button";

export default Button;
