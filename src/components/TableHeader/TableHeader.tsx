import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {
  onToggle?: () => void;
  arrow?: "up" | "down";
}

const TableHeader: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  onToggle,
  arrow,
}) => {
  const iconClassName =
    "w-5 h-5 opacity-0 group-hover:opacity-100 duration-300";

  return (
    <button className="uppercase flex cursor-pointer group " onClick={onToggle}>
      <span>{children}</span>

      {arrow === "up" ? (
        <ArrowUpIcon className={iconClassName} />
      ) : (
        <ArrowDownIcon className={iconClassName} />
      )}
    </button>
  );
};

export default TableHeader;
