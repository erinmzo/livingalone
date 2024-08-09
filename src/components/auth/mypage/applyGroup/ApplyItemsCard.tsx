import React from "react";
import { GroupApplyItems } from "@/types/types";
import ApplyItemImage from "./ApplyItemImage";
import ApplyItemInfo from "./ApplyItemInfo";
import OrdererInfo from "./OrderInfo";
interface ApplyItemsCardProps {
  apply: GroupApplyItems;
}

const ApplyItemsCard: React.FC<ApplyItemsCardProps> = ({ apply }) => {
  const isFinished = apply.group_posts.is_finished;

  return (
    <li key={apply.id}>
      <div className="md:w-[672px] md:h-[140px] border border-gray-2 rounded-lg flex items-center p-3 w-[343px] h-[161px] ">
        <div className="flex w-[393px] h-[100px] gap-2 md:border-r-[1px] border-gray-2">
          <ApplyItemImage
            imgUrl={apply.group_posts.img_url}
            postId={apply.post_id}
            isFinished={isFinished}
          />
          <ApplyItemInfo
            title={apply.group_posts.title}
            startDate={apply.group_posts.start_date}
            endDate={apply.group_posts.end_date}
            price={apply.group_posts.price}
            isFinished={isFinished}
          />
        </div>
        <OrdererInfo
          userName={apply.user_name}
          userPhone={apply.user_phone}
          userAddress={apply.user_address}
        />
      </div>
    </li>
  );
};

export default ApplyItemsCard;
