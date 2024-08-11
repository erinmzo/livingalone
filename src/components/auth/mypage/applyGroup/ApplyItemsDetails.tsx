import React from "react";
import { GroupApplyItems } from "@/types/types";

interface ApplyItemsDetailsProps {
  apply: GroupApplyItems;
}

const ApplyItemsDetails: React.FC<ApplyItemsDetailsProps> = ({ apply }) => {
  return (
    <>
      <div className="text-gray-4 text-[12px]">
        {apply.group_posts.start_date} ~ {apply.group_posts.end_date}
      </div>
      <div className="text-black text-[14px]">
        <div className="mb-1">{apply.group_posts.title}</div>
        <div>{apply.group_posts.price.toLocaleString()}원</div>
      </div>
    </>
  );
};

export default ApplyItemsDetails;
