import React from "react";

const SkeletonMyGroupPost = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex items-center justify-center md:block">
        <div className=" bg-gray-2 md:rounded mb-6 mt-8 md:mt-0 border rounded-full w-[76px] h-[30px] md:w-[115px] md:h-[29px]"></div>
      </div>

      <div className="border border-gray-2 rounded-lg py-4 md:py-6 px-3 md:px-8 text-gray-4 mb-2 md:mb-6">
        {/* 상단 텍스트 */}
        <div className="bg-gray-2 rounded h-[16px] mb-4 w-full"></div>
        <div className="bg-gray-2 rounded h-[16px] mb-4 w-full md:hidden"></div>

        {/* 리스트 항목들 */}
        <div className="flex mb-2 items-center">
          <div className="w-[18px] flex justify-center shrink-0">
            <div className="w-[4px] h-[4px] rounded-full mt-[5px"></div>
          </div>
          <div className="bg-gray-2 rounded h-[16px] flex-grow ml-2"></div>
        </div>
        <div className="flex mb-2 items-center">
          <div className="w-[18px] flex justify-center shrink-0">
            <div className="w-[4px] h-[4px] rounded-full mt-[5px"></div>
          </div>
          <div className="bg-gray-2 rounded h-[16px] flex-grow ml-2"></div>
        </div>
        <div className="flex items-center">
          <div className="w-[18px] flex justify-center shrink-0">
            <div className="w-[4px] h-[4px] rounded-full mt-[5px"></div>
          </div>
          <div className="bg-gray-2 rounded h-[16px] flex-grow ml-2"></div>
        </div>

        {/* 하단 텍스트 */}
        <div className="bg-gray-2 rounded h-[16px] mt-4 w-3/4"></div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between md:items-center py-4 md:py-[10px] border-b md:border-t border-gray-2 gap-1 md:gap-0 text-gray-2">
        <span className="bg-gray-2 rounded h-[12px] w-1/4 md:hidden"></span>
        <div className="flex flex-row-reverse md:flex-row justify-between w-full md:w-auto">
          <span className="flex items-center px-1 cursor-pointer">
            <div className="bg-gray-2 rounded-full w-[20px] h-[20px]"></div>
          </span>
          <div className="bg-gray-2 rounded h-[16px] w-3/4 md:w-[100px] truncate ml-2"></div>
        </div>
        <div className="hidden md:block bg-gray-2 rounded-full w-[20px] h-[20px]"></div>
        <span className="bg-gray-2 rounded h-[12px] w-2/4 md:w-1/4"></span>
        <span className="bg-gray-2 rounded h-[12px] w-1/4 hidden md:block"></span>
        <div className="flex">
          <button className="font-bold w-[70px] h-[25px] text-[14px] flex items-center justify-between p-[7.5px] gap-1 bg-gray-2 rounded-full"></button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMyGroupPost;
