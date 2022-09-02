import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";
import IconButton from "../IconButton";

type Severity = "error" | "info" | "success" | "warning";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  component?: keyof React.ReactHTML;
  severity?: Severity;
  action?: React.ReactNode;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLElement, Props>(
  (
    {
      children,
      className,
      component = "div",
      severity = "success",
      action,
      role = "alert",
      onClose,
      ...others
    },
    ref,
  ) => {
    const classes = clsx(
      "px-4 py-2  shadow-inner rounded",
      {
        ["bg-red-50"]: severity === "error",
        ["bg-green-50"]: severity === "success",
      },
      className,
    );

    return React.createElement(
      component,
      {
        ...others,
        ref,
        className: classes,
      },
      <div className="flex items-center">
        <InformationCircleIcon className="w-6 h-6 mr-3 text-red-600" />

        <div className="py-2 text-red-800">{children}</div>

        {action == null && onClose && (
          <div className="flex ml-auto items-start">
            <IconButton onClick={onClose}>
              <XMarkIcon className="w-6 h-6" />
            </IconButton>
          </div>
        )}
      </div>,
    );
  },
);

Alert.displayName = "Alert";

export default Alert;
