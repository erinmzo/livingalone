import React from "react";

const GroupPostCardSkeleton: React.FC = () => {
  return (
    <div className="relative text-gray-2 animate-pulse">
      <div className="w-32 h-8 bg-gray-2 rounded mb-6"></div>
      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-2 bg-gray-2 w-[315px]"></div>
      <div className="px-1 mt-[16px]">
        <div className="flex items-center gap-2">
          <div className="py-[4px] px-[12px] rounded-full bg-gray-2 text-gray-bg-gray-2 text-[12px] font-bold">
            진행중
          </div>
          <div className="text-[14px] text-gray-bg-gray-2">
            <span className="bg-gray-2 rounded w-16 h-4 inline-block"></span>
            <span> ~ </span>
            <span className="bg-gray-2 rounded w-16 h-4 inline-block"></span>
          </div>
        </div>
        <h4 className="text-[20px] truncate mt-[6px] w-[309px] bg-gray-2 rounded  h-6"></h4>
        <div className="flex items-baseline gap-2 mt-[6px]">
          <span className="bg-gray-2 rounded w-24 h-6"></span>
          <span className="bg-gray-2 rounded w-16 h-6"></span>
        </div>
      </div>
    </div>
  );
};

export default GroupPostCardSkeleton;
