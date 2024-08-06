import React from "react";

const SkeletonSideBar: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-[208px] h-[600px] items-center border border-gray-2 rounded-lg bg-white animate-pulse">
      <div className="flex-col justify-center items-center mb-8">
        <div className="w-full">
          <div className="border border-gray-2 bg-gray-200 rounded-full mb-6 w-[100px] h-[100px]"></div>
        </div>
        <div className="w-full h-[19px] bg-gray-200 rounded"></div>
      </div>
      <ul className="flex flex-col gap-[24px] items-start w-full px-4">
        {[...Array(7)].map((_, index) => (
          <li key={index} className="w-full h-[24px] bg-gray-200 rounded"></li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonSideBar;
