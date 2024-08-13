import React from "react";

const SkeletonMust = () => {
  return (
    <div className="relative animate-pulse">
      <div
        className="font-bold mt-8 md:mt-0 text-[12px] flex items-center justify-center border border-main-8 rounded-full w-[76px] h-[30px] text-main-8 
          md:border-none md:rounded-none md:text-left md:text-black md:text-[24px] md:w-[115px] md:h-[29px] md:block"
      ></div>
      <div className="overflow-hidden relative aspect-square rounded-lg border border-gray-2 bg-gray-2 w-[315px]"></div>
      <div className="px-1 mt-4 w-[309px]">
        <span className="block text-[14px] bg-gray-2 h-4 rounded  mb-1"></span>
        <h4 className="text-[20px] bg-gray-2 h-6 rounded "></h4>
      </div>
    </div>
  );
};

export default SkeletonMust;
