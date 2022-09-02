import clsx from "clsx";
import React from "react";
import Typography from "../Typography";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  component?: keyof React.ReactHTML;
  title?: any;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  avatar?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLElement, Props>(
  (
    {
      children,
      className,
      component = "div",
      avatar,
      title,
      subheader,
      ...others
    },
    ref
  ) => {
    const classes = clsx("p-4 flex items-center dark:text-white", className);

    return React.createElement(
      component,
      {
        ...others,
        ref,
        className: classes,
      },
      <>
        {avatar && <div className="flex flex-[0,0,auto] mr-4">{avatar}</div>}

        <div className="flex-auto">
          {typeof title === "string" ? (
            <Typography
              variant="h3"
              className="font-bold dark:text-white text-gray-600 mb-1"
            >
              {title}
            </Typography>
          ) : (
            <div className="mb-2">{title}</div>
          )}

          {typeof subheader === "string" ? (
            <Typography className="dark:text-white text-gray-600">
              {subheader}
            </Typography>
          ) : (
            subheader
          )}
        </div>
      </>
    );
  }
);

CardHeader.displayName = "CardHeader";

export default CardHeader;
