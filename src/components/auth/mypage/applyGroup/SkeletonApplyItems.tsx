const ApplyItemsCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-center md:block">
        <div className=" bg-gray-2 md:rounded mb-6 mt-8 md:mt-0 border rounded-full w-[76px] h-[30px] md:w-[115px] md:h-[29px]"></div>
      </div>
      <div className="md:px-4 md:py-5 border border-gray-2 rounded-lg flex items-center justify-between p-4 w-full">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-2 rounded-lg border border-gray-2 w-[70px] h-[70px] md:w-[100px] md:h-[100px]"></div>
            <div className="md:hidden bg-gray-2 rounded w-[50px] h-[20px]"></div>
          </div>
          <div className="flex flex-col gap-4 md:hidden">
            <div className="bg-gray-2 rounded w-[150px] h-[20px]"></div>
            <div className="flex flex-col text-[14px] gap-2">
              <div className="bg-gray-2 rounded w-[80px] h-[16px]"></div>
              <div className="bg-gray-2 rounded w-[120px] h-[16px]"></div>
              <div className="bg-gray-2 rounded w-[100px] h-[16px]"></div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gray-2 rounded w-[80px] h-[20px]"></div>
              <div className="bg-gray-2 rounded w-[150px] h-[20px]"></div>
            </div>
            <div className="text-black">
              <div className="bg-gray-2 rounded w-[150px] h-[20px] mb-2"></div>
              <div className="bg-gray-2 rounded w-[120px] h-[20px]"></div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex w-[227px] h-[94px] ml-5  flex-col justify-center border-l border-gray-2 pl-[30px]">
          <div className="bg-gray-2 rounded w-[80px] h-[16px] mb-2"></div>
          <div className="bg-gray-2 rounded w-[100px] h-[16px] mb-2"></div>
          <div className="bg-gray-2 rounded w-[110px] h-[16px] mb-2"></div>
          <div className="bg-gray-2 rounded w-[120px] h-[16px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ApplyItemsCardSkeleton;
