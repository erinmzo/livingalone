import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GroupApplyItems } from "@/types/types";

interface ApplyItemsCardProps {
  apply: GroupApplyItems;
}

const ApplyItemsCard: React.FC<ApplyItemsCardProps> = ({ apply }) => {
  const isFinished = apply.group_posts.is_finished;

  return (
    <li key={apply.id}>
      <div className="w-[672px] h-[140px] border border-gray-2 rounded-lg flex items-center p-3">
        <div className="flex w-[393px] h-[100px] gap-2 border-r-[1px] border-gray-2">
          <Link href={`/grouppost/read/${apply.post_id}`}>
            <Image
              src={apply.group_posts.img_url}
              alt="이미지"
              width={100}
              height={100}
              className="rounded-lg border border-gray-2"
            />
          </Link>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex gap-2">
              <div>
                {isFinished ? (
                  <span className="py-[4px] px-[12px] rounded-full bg-gray-2 text-gray-3 text-[12px] font-bold">
                    종료됨
                  </span>
                ) : (
                  <span className="py-[4px] px-[12px] rounded-full bg-main-7 text-white text-[12px] font-bold">
                    진행중
                  </span>
                )}
              </div>
              <div className="text-gray-4">
                {apply.group_posts.start_date} ~ {apply.group_posts.end_date}
              </div>
            </div>
            <div className="text-black">
              <div className="mb-1">{apply.group_posts.title}</div>
              <div>{apply.group_posts.price.toLocaleString()}원</div>
            </div>
          </div>
        </div>
        <div className="w-[227px] h-[94px] ml-5 flex flex-col justify-center">
          <div className="text-gray-4 mb-2 font-bold">주문자 정보</div>
          <div className="text-gray-3 text-sm">
            <div>{apply.user_name}</div>
            <div>{apply.user_phone}</div>
            <div>{apply.user_address}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ApplyItemsCard;
