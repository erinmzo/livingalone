import React from "react";

const SkeletonMyGroupPost: React.FC = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex justify-between items-center py-[10px] border-t border-b border-gray-2">
        <div className="flex">
          <div className="flex items-center px-1">
            <div className="w-[20px] h-[20px] bg-gray-2 rounded-full"></div>
          </div>
          <div className="font-bold w-[200px] h-[20px] bg-gray-2 rounded truncate ml-2"></div>
        </div>
        <div className="w-[20px] h-[20px] bg-gray-2 rounded-full"></div>
        <span className="w-[100px] h-[20px] bg-gray-2 rounded"></span>
        <span className="w-[50px] h-[20px] bg-gray-2 rounded"></span>
        <div className="flex">
          <button className="font-bold w-[70px] h-[25px] bg-gray-2 rounded-full"></button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMyGroupPost;
