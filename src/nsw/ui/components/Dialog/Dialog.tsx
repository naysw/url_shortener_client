import { Dialog as HeadLessUIDialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl";

interface Props extends React.ComponentProps<"div"> {
  children?: React.ReactNode[] | React.ReactNode;
  open: boolean;
  onClose?: () => void;
  fullWidth?: boolean;
  maxWidth?: MaxWidth;
}

const Dialog = ({
  children,
  className,
  open,
  maxWidth = "sm",
  fullWidth,
  onClose,
  ...others
}: Props) => {
  const classes = clsx(
    "bg-white rounded-md backdrop-blur-sm overflow-hidden  text-left",
    {
      "max-w-xs": maxWidth === "xs",
      "max-w-sm": maxWidth === "sm",
      "max-w-xl": maxWidth === "md",
      "max-w-2xl": maxWidth === "lg",
      "max-w-3xl": maxWidth === "xl",
    },
    fullWidth && "w-full",
    className,
  );

  function handleClose() {
    if (typeof onClose === "function") onClose();
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <HeadLessUIDialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadLessUIDialog.Panel className={classes}>
                {children}
              </HeadLessUIDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadLessUIDialog>
    </Transition>
  );
};

export default Dialog;
