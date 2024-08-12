import React from "react";
import { GroupApplyItems } from "@/types/types";

interface ApplyItemsDetailsProps {
  apply: GroupApplyItems;
}

const ApplyItemsDetails: React.FC<ApplyItemsDetailsProps> = ({ apply }) => {
  return (
    <>
      <div className=" flex flex-col gap-1">
        <div className="text-gray-4 text-[12px] md:hidden">
          {apply.group_posts.start_date} ~ {apply.group_posts.end_date}
        </div>
        <div className="text-black text-[14px]">{apply.group_posts.title}</div>
        <div className="text-black text-[14px]">
          {apply.group_posts.price.toLocaleString()}원
        </div>
      </div>
    </>
  );
};

export default ApplyItemsDetails;
