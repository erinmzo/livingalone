import React from "react";

const SkeletonMust = () => {
  const MustArray = [1, 2];
  return (
    <div className="relative animate-pulse">
      <div className="flex items-center justify-center md:block">
        <div className=" bg-gray-2 md:rounded mb-6 mt-8 md:mt-0 border rounded-full w-[76px] h-[30px] md:w-[115px] md:h-[29px]"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {MustArray.map((_, index) => (
          <div key={index} className="flex">
            <div className="flex-1">
              <div className="overflow-hidden relative aspect-square rounded-lg border border-gray-2 bg-gray-2 w-full "></div>
              <div className="px-1 mt-4 w-full">
                <span className="block text-[14px] bg-gray-2 h-4 rounded mb-1"></span>
                <h4 className="text-[20px] bg-gray-2 h-6 rounded "></h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonMust;
