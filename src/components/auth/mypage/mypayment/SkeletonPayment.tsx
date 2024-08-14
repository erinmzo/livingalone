import React from "react";

function SkeletonPayment() {
  return (
    <>
      <div className="w-full animate-pulse">
        <div className="flex items-center justify-center md:block">
          <div className=" bg-gray-2 md:rounded mb-6 mt-8 md:mt-0 border rounded-full w-[76px] h-[30px] md:w-[115px] md:h-[29px]"></div>
        </div>
        <div className="border border-gray-2 w-full rounded-lg py-5 px-5 md:px-8 flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
          <div className="flex flex-col gap-3">
            <p className="bg-gray-2 rounded h-[20px] w-[100px] mb-1"></p>
            <div className="flex items-center gap-3 md:gap-[10px]">
              {/* 이미지 */}
              <div className="bg-gray-2 rounded w-[62px] h-[62px] shrink-0"></div>
              <div className="flex flex-col gap-1 w-full">
                {/* 상품 이름 스켈레톤 */}
                <div className="bg-gray-2 rounded h-[20px] w-[150px]"></div>
                {/* 가격 스켈레톤 */}
                <div className="bg-gray-2 rounded h-[20px] w-[50px]"></div>
              </div>
            </div>
          </div>
          <div className="md:border-l md:border-gray-2 md:pl-8 md:flex md:flex-col md:justify-center">
            <p className="bg-gray-2 rounded h-[15px] w-[120px] mb-1"></p>
            <p className="bg-gray-2 rounded h-[15px] w-[150px] mb-1"></p>
            <p className="bg-gray-2 rounded h-[15px] w-[150px] mb-1"></p>
            <p className="bg-gray-2 rounded h-[15px] w-[150px] mb-1"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonPayment;
