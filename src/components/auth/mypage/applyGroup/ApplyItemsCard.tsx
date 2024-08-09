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
      <div className="md:w-[672px] md:h-[140px] border border-gray-2 rounded-lg flex items-center p-4 w-[343px] h-[161px] ">
        <div className="flex gap-2 ">
          <div className="flex gap-[16px]">
            <div className="flex flex-col justify-center items-center gap-3">
              <Link href={`/grouppost/read/${apply.post_id}`}>
                <Image
                  src={apply.group_posts.img_url}
                  alt="이미지"
                  width={100}
                  height={100}
                  className="rounded-lg border border-gray-2"
                />
              </Link>
              <div className="md:hidden">
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
            </div>
            {/* 반응형 정보 */}
            <div className="flex flex-col items-start gap-[14px]  md:hidden ">
              <div className="md:hidden flex flex-col ">
                <div className="text-gray-4 text-[12px]">
                  {apply.group_posts.start_date} ~ {apply.group_posts.end_date}
                </div>
                <div className="text-black text-[14px]">
                  <div className="mb-1">{apply.group_posts.title}</div>
                  <div>{apply.group_posts.price.toLocaleString()}원</div>
                </div>
              </div>
              {/* 반응형 정보 끝 */}
              {/* 주문자 정보 끝 */}
              <div className=" flex flex-col text-[14px] items-start md:hidden ">
                <div className="text-gray-4  font-bold ">주문자 정보</div>
                <div className="text-gray-3 text-sm">
                  <div className="flex gap-2">
                    <div className="border-r border-gray-2 pr-2">
                      {apply.user_name}
                    </div>{" "}
                    <div>{apply.user_phone}</div>
                  </div>
                  <div>{apply.user_address}</div>
                </div>
              </div>
            </div>
            {/* 주문자 정보 끝 */}
          </div>

          <div className="flex flex-col justify-center gap-2 ">
            <div className=" md:flex md:gap-2 hidden ">
              <div>
                {isFinished ? (
                  <span className="md:py-[4px] md:px-[12px] w-[70px] h-[26px] rounded-full bg-gray-2 text-gray-3 text-[12px] font-bold">
                    종료됨
                  </span>
                ) : (
                  <span className="py-[4px] px-[12px] rounded-full bg-main-7 text-white text-[12px] font-bold">
                    진행중
                  </span>
                )}
              </div>
              <div className="text-gray-4 hidden md:block">
                {apply.group_posts.start_date} ~ {apply.group_posts.end_date}
              </div>
            </div>
            <div className="text-black hidden md:block">
              <div className="mb-1">{apply.group_posts.title}</div>
              <div>{apply.group_posts.price.toLocaleString()}원</div>
            </div>
          </div>
        </div>
        <div className="w-[227px] h-[94px] ml-5  flex-col justify-center border-l border-gray-2 pl-[30px] hidden md:block ">
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
