import React from "react";

interface ApplyItemsStatusProps {
  isFinished: boolean;
}

const ApplyItemsStatus: React.FC<ApplyItemsStatusProps> = ({ isFinished }) => {
  return (
    <span
      className={`py-[4px] px-[12px] rounded-full text-[12px] font-bold ${
        isFinished ? "bg-gray-2 text-gray-3" : "bg-main-7 text-white"
      }`}
    >
      {isFinished ? "종료됨" : "진행중"}
    </span>
  );
};

export default ApplyItemsStatus;
