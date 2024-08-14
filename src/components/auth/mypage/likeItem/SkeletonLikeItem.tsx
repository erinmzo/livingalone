import React from "react";

const GroupPostCardSkeleton = () => {
  return (
    <div className="relative text-gray-2 animate-pulse">
      <div className="flex items-center justify-center md:block">
        <div className=" bg-gray-2 md:rounded mb-6 mt-8 md:mt-0 border rounded-full w-[76px] h-[30px] md:w-[115px] md:h-[29px]"></div>
      </div>
      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-2 bg-gray-2 w-full "></div>
      <div className="px-1 mt-[16px]">
        <div className="flex items-center gap-2">
          <div className="py-[4px] px-[12px] rounded-full bg-gray-2 text-gray-bg-gray-2 text-[12px] font-bold">
            진행중
          </div>
          <div className=" w-fit text-gray-bg-gray-2">
            <span className="bg-gray-2 rounded w-16 h-4 inline-block"></span>
            <span> ~ </span>
            <span className="bg-gray-2 rounded w-16 h-4 inline-block"></span>
          </div>
        </div>
        <h4 className=" truncate mt-[6px] w-full bg-gray-2 rounded  h-6"></h4>
        <div className="flex items-baseline gap-2 mt-[6px]">
          <span className="bg-gray-2 rounded w-24 h-6"></span>
          <span className="bg-gray-2 rounded w-16 h-6"></span>
        </div>
      </div>
    </div>
  );
};

export default GroupPostCardSkeleton;
