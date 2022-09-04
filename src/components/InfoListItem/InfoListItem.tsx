import React from "react";
import Typography from "../../nsw/ui/components/Typography";

const InfoListItem = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactElement;
}) => {
  return (
    <div className="flex justify-start relative items-center w-full py-2">
      {React.cloneElement(icon, {
        className: "w-6 h-6 mr-4",
      })}

      <div>
        <Typography className="dark:text-white font-semibold break-all">
          {title}
        </Typography>

        <Typography className="dark:text-white font-light">{value}</Typography>
      </div>
    </div>
  );
};

export default InfoListItem;
