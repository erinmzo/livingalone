"use client";

import { applyItems } from "@/apis/mypage";
import GroupPostCard from "@/components/grouppost/list/GroupPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function ApplyItems() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: applyPosts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["apply", userId],
    queryFn: () => applyItems(userId),
  });

  if (isPending) return <div>로딩 중..</div>;
  if (isError) return <div>에러..</div>;

  console.log(applyPosts);
  return (
    user && (
      <div>
        <div className="text-[24px] font-bold">신청한 공구</div>
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applyPosts.map((apply: any) => {
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
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
}

export default ApplyItems;
