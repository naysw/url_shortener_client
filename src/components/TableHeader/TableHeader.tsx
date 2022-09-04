import { ArrowDownIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {}

const TableHeader: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const iconClassName =
    "w-5 h-5 opacity-0 group-hover:opacity-100 duration-300";

  return (
    <div className="uppercase flex cursor-pointer group">
      <span>{children}</span>

      <ArrowDownIcon className={iconClassName} />
    </div>
  );
};

export default TableHeader;
