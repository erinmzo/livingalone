"use client";

import { applyItems } from "@/apis/mypage";

import { GroupApplyItems } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function ApplyItems() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: applyPosts = [],
    isPending,
    isError,
  } = useQuery<GroupApplyItems[]>({
    queryKey: ["apply", userId],
    queryFn: () => applyItems(userId),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/img/loading-spinner.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    );

  if (isError) return <div>에러..</div>;

  console.log(applyPosts);

  return (
    user && (
      <div>
        <div className="text-[24px] font-bold ml-1">신청한 공구</div>
        <div className="mt-8">
          {applyPosts.length ? (
            <ul className="grid grid-cols-1 sm:grid-cols-1 gap-8">
              {applyPosts.map((apply) => {
                const isFinished = apply.group_posts.is_finished;
                return (
                  <li key={apply.id}>
                    <div className="w-[672px] h-[140px] border border-gray-2 rounded-lg flex items-center p-3">
                      <div className="flex w-[393px] h-[100px] gap-2 border-r-[1px] border-gray-2">
                        <Image
                          src={apply.group_posts.img_url}
                          alt="이미지"
                          width={100}
                          height={100}
                          className="rounded-lg border border-gray-2"
                        />
                        <div className="flex flex-col justify-center gap-1">
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
                            <div>
                              {apply.group_posts.start_date} ~{" "}
                              {apply.group_posts.end_date}
                            </div>
                          </div>
                          <div>{apply.group_posts.title}</div>
                          <div>
                            {apply.group_posts.price.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                      <div className="w-[227px] h-[94px] ml-5 flex flex-col justify-center">
                        <div className="text-gray-4 mb-2">주문자 정보</div>
                        <div className="text-gray-3 text-sm">
                          <div>{apply.user_name}</div>
                          <div>
                            <div>{apply.user_phone}</div>
                            {/* <div>{apply}</div> */}
                          </div>
                          <div>{apply.user_address}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col py-[100px] justify-center items-center">
              <Image
                src="/img/icon-empty.png"
                alt="empty"
                width={100}
                height={0}
                className="mb-5"
              />
              <div className="flex justify-center items-center text-gray-4">
                아직 신청한 공구가 없습니다. 마음에 드는 공구가 있다면
                신청해보세요!
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default ApplyItems;
