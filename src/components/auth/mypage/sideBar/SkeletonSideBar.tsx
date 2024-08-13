import React from "react";

const SkeletonSideBar = () => {
  return (
    <div className="md:flex flex-col justify-center w-[208px] h-[600px] items-center border border-gray-2 rounded-lg bg-white md:animate-pulse hidden ">
      <div className="flex-col justify-center items-center mb-8">
        <div className="w-full">
          <div className="border border-gray-2 bg-gray-2 rounded-full mb-6 w-[100px] h-[100px]"></div>
        </div>
        <div className="w-full h-[19px] bg-gray-2 rounded"></div>
      </div>
      <ul className="flex flex-col gap-[24px] items-start w-full px-4">
        {[...Array(7)].map((_, index) => (
          <li key={index} className="w-full h-[24px] bg-gray-2 rounded"></li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonSideBar;
