import React from "react";

const ApplyItemsCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* 상단 로딩 배너 */}
      <div className="flex items-center justify-center md:block">
        <div className=" bg-gray-2 md:rounded mb-6 mt-8 md:mt-0 border rounded-full w-[76px] h-[30px] md:w-[115px] md:h-[29px]"></div>
      </div>

      {/* 카드 본문 */}
      <div className="md:px-4 md:py-5 border border-gray-2 rounded-lg flex items-center p-4 w-full">
        {/* 이미지 및 작은 화면에서 상태 표시 */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-3">
            {/* 이미지 스켈레톤 */}
            <div className="bg-gray-2 rounded-lg border border-gray-2 w-[70px] h-[70px] md:w-[100px] md:h-[100px]"></div>
            {/* 작은 화면에서 상태 스켈레톤 */}
            <div className="md:hidden bg-gray-2 rounded w-[50px] h-[20px]"></div>
          </div>

          {/* 작은 화면에서 정보 표시 */}
          <div className="flex flex-col gap-4 md:hidden">
            {/* 정보 스켈레톤 */}
            <div className="bg-gray-2 rounded w-[150px] h-[20px]"></div>
            <div className="flex flex-col text-[14px] gap-2">
              <div className="bg-gray-2 rounded w-[80px] h-[16px]"></div>
              <div className="bg-gray-2 rounded w-[120px] h-[16px]"></div>
              <div className="bg-gray-2 rounded w-[100px] h-[16px]"></div>
            </div>
          </div>

          {/* 큰 화면에서 상태 및 상세 정보 표시 */}
          <div className="hidden md:flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
              {/* 상태 스켈레톤 */}
              <div className="bg-gray-2 rounded w-[50px] h-[20px]"></div>
              <div className="bg-gray-2 rounded w-[100px] h-[20px]"></div>
            </div>
            <div className="text-black">
              {/* 상세 정보 스켈레톤 */}
              <div className="bg-gray-2 rounded w-[150px] h-[20px] mb-2"></div>
              <div className="bg-gray-2 rounded w-[120px] h-[20px]"></div>
            </div>
          </div>
        </div>

        {/* 큰 화면에서 주문자 정보 표시 */}
        <div className="hidden md:flex w-[227px] h-[94px] ml-5  flex-col justify-center border-l border-gray-2 pl-[30px]">
          {/* 주문자 정보 스켈레톤 */}
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
