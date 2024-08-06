import React from "react";

const SkeletonProfile: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col gap-8">
      <div className="w-32 h-8 bg-gray-300 rounded"></div>
      <form className="flex flex-col items-center">
        <div className="flex w-full gap-[32px]">
          <div className="w-full">
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full">
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="relative mt-16 flex flex-col w-full">
          <button
            type="button"
            className="flex gap-3 w-[73px] py-2 border border-gray-3 bg-gray-300 font-bold rounded-full mb-3 justify-center items-center"
          >
            <span className="text-center text-[12px] text-gray-3">
              주소변경
            </span>
          </button>
          <div className="flex flex-col gap-2 ">
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-gray-300 w-[500px] h-[52px] text-white py-2 mt-[50px] rounded-full font-bold text-[18px]"
        ></button>
      </form>
    </div>
  );
};

export default SkeletonProfile;
