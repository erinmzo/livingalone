"use client";

import { applyItems } from "@/apis/mypage";
import GroupPostCard from "@/components/grouppost/list/GroupPostCard";
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
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

  if (isError) return <div>에러..</div>;

  return (
    user && (
      <div>
        <div className="text-[24px] font-bold ml-1">신청한 공구</div>
        <div className="mt-8">
          {applyPosts.length ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {applyPosts.map((apply) => {
                return (
                  <li key={apply.id}>
                    <GroupPostCard
                      application={applyPosts}
                      title={apply.group_posts.title}
                      price={apply.group_posts.price}
                      peopleNum={apply.group_posts.people_num + 1}
                      isFinished={apply.group_posts.is_finished}
                      imgUrl={apply.group_posts.img_url}
                      startDate={apply.group_posts.start_date}
                      endDate={apply.group_posts.end_date}
                      postId={apply.group_posts.id}
                    />
                    {/* <div>
                      <div>{apply.user_name}</div>
                      <div>주소 : {apply.user_address}</div>
                      <div>{apply.user_detail_address}</div>
                      <div>{apply.user_phone}</div>
                    </div> */}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col py-[100px] justify-center items-center">
              <Image src="/img/icon-empty.png" alt="empty" width={100} height={0} className="mb-5" />
              <div className="flex justify-center items-center text-gray-4">
                아직 신청한 공구가 없습니다. 마음에 드는 공구가 있다면 신청해보세요!
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default ApplyItems;
