"use client";

import { wishItem } from "@/apis/mypage";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { getUser } from "@/apis/auth";

function WishMust() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const saveUser = useAuthStore((state) => state.saveUser);

  useEffect(() => {
    getUser().then((res) => saveUser(res.user));
  }, []);

  console.log(user);
  const {
    data: wish = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["wish", userId],
    queryFn: () => wishItem(userId),
  });

  if (isPending) return <div>로딩 중..</div>;
  if (isError) return <div>에러.. </div>;

  console.log(userId);
  console.log(wish);

  if (!Array.isArray(wish)) return null;
  return (
    <div>
      <div className="text-[24px] font-bold">찜한 자취템</div>
      <div>
        <ul className="grid grid-cols-2 gap-[32px]">
          {wish.map((post: any) => (
            <li key={post.id} className="mb-[64px]">
              <MustPostCard
                postId={post.post_id}
                title={post.must_posts.title}
                item={post.must_posts.item}
                imgUrl={post.must_posts.img_url}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WishMust;
