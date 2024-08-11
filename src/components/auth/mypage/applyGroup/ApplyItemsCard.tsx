import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GroupApplyItems } from "@/types/types";
import ApplyItemsStatus from "./ApplyItemsStatus";
import ApplyItemsDetails from "./ApplyItemsDetails";
import ApplyItemsUserInfo from "./ApplyItemsUserInfo";

interface ApplyItemsCardProps {
  apply: GroupApplyItems;
}

const ApplyItemsCard: React.FC<ApplyItemsCardProps> = ({ apply }) => {
  const { group_posts, post_id, user_name, user_phone, user_address } = apply;
  const isFinished = group_posts.is_finished;

  return (
    <li key={apply.id}>
      <div className="md:w-[672px] md:h-[140px] border border-gray-2 rounded-lg flex items-center p-4 w-[343px] h-[161px]">
        <div className="flex gap-2">
          <div className="flex gap-[16px]">
            <div className="flex flex-col justify-center items-center gap-3">
              <Link href={`/grouppost/read/${post_id}`}>
                <Image
                  src={group_posts.img_url}
                  alt="이미지"
                  width={100}
                  height={100}
                  className="rounded-lg border border-gray-2"
                />
              </Link>
              {/* 반응형 코드 시작: 작은 화면에서 상태 표시 */}
              <div className="md:hidden">
                <ApplyItemsStatus isFinished={isFinished} />
              </div>
              {/* 반응형 코드 끝 */}
            </div>
            {/* 반응형 코드 시작: 작은 화면에서 정보 표시 */}
            <div className="flex flex-col items-start gap-[14px] md:hidden">
              <ApplyItemsDetails apply={apply} />
              <div className="flex flex-col text-[14px] items-start">
                <div className="text-gray-4 font-bold">주문자 정보</div>
                <ApplyItemsUserInfo
                  userName={user_name}
                  userPhone={user_phone}
                  userAddress={user_address}
                />
              </div>
            </div>
            {/* 반응형 코드 끝 */}
          </div>

          <div className="flex flex-col justify-center gap-2">
            {/* 비반응형 코드 시작: 큰 화면에서 상태 및 정보 표시 */}
            <div className="md:flex md:gap-2 hidden">
              <ApplyItemsStatus isFinished={isFinished} />
              <div className="text-gray-4">
                {group_posts.start_date} ~ {group_posts.end_date}
              </div>
            </div>
            <div className="text-black hidden md:block">
              <ApplyItemsDetails apply={apply} />
            </div>
            {/* 비반응형 코드 끝 */}
          </div>
        </div>
        {/* 비반응형 코드 시작: 큰 화면에서 주문자 정보 표시 */}
        <div className="w-[227px] h-[94px] ml-5 flex-col justify-center border-l border-gray-2 pl-[30px] hidden md:flex">
          <div className="text-gray-4 mb-2 font-bold">주문자 정보</div>
          <ApplyItemsUserInfo
            userName={user_name}
            userPhone={user_phone}
            userAddress={user_address}
          />
        </div>
        {/* 비반응형 코드 끝 */}
      </div>
    </li>
  );
};

export default ApplyItemsCard;
