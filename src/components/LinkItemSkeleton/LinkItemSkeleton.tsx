const LinkItemSkeleton = () => {
  return (
    <div className="flex space-x-2 mb-2">
      <div className="select-none text-transparent animate-pulse bg-gray-300 w-6/12 h-6 rounded">
        Full Url
      </div>

      <div className="select-none text-transparent animate-pulse bg-gray-300 w-5/12 h-6 rounded">
        Short Url
      </div>

      <div className="select-none text-transparent animate-pulse bg-gray-300 w-1/12 h-6 rounded">
        Copy Button
      </div>
    </div>
  );
};

export default LinkItemSkeleton;
