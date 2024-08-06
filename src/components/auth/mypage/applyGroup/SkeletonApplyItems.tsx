import React from "react";

const SkeletonApplyItemsCard: React.FC = () => {
  return (
    <div className="w-[672px] h-[140px] border border-gray-2 rounded-lg flex items-center p-3 animate-pulse">
      <div className="flex w-[393px] h-[100px] gap-2 border-r-[1px] border-gray-2">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg border border-gray-2"></div>
        <div className="flex flex-col justify-center gap-2 w-full">
          <div className="flex gap-2">
            <div className="w-[60px] h-[20px] bg-gray-200 rounded-full"></div>
            <div className="w-[150px] h-[20px] bg-gray-200 rounded"></div>
          </div>
          <div className="w-[200px] h-[20px] bg-gray-200 rounded"></div>
          <div className="w-[100px] h-[20px] bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="w-[227px] h-[94px] ml-5 flex flex-col justify-center gap-2">
        <div className="w-[100px] h-[20px] bg-gray-200 rounded"></div>
        <div className="w-[150px] h-[20px] bg-gray-200 rounded"></div>
        <div className="w-[100px] h-[20px] bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonApplyItemsCard;
