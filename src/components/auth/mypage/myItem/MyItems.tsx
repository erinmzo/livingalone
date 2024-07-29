"use client";

import { myItemsPost } from "@/apis/mypage";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function MyItems() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: like = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["liek", userId],
    queryFn: () => myItemsPost(userId),
  });

  if (isPending) return <div>로딩 중..</div>;
  if (isError) return <div>에러.. </div>;

  return (
    user && (
      <div>
        <div className="text-[24px] font-bold">나의 자취템</div>
        <div>
          <ul className="grid grid-cols-2 gap-[32px]">
            {like.map((post: any) => (
              <li key={post.id} className="mb-[64px]">
                <MustPostCard
                  postId={post.id}
                  title={post.title}
                  item={post.item}
                  imgUrl={post.img_url}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default MyItems;
