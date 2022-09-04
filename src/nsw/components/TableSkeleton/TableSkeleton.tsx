const TableSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      {new Array(4).fill(0).map((_, index) => (
        <div className="col-span-3" key={index}>
          <div className=" text-transparent animate-pulse bg-gray-300 w-full max-w-lg mb-2 rounded-md">
            Loading
          </div>

          <div className="text-transparent animate-pulse bg-gray-300 w-full max-w-md py-4">
            Loading
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
