import React from "react";

const LinearProgress = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setValue((newLevel) => (newLevel >= 100 ? 0 : newLevel + 10));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full bg-gray-200 h-1">
      <div
        className={"bg-blue-600 h-1 w-full"}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default LinearProgress;
