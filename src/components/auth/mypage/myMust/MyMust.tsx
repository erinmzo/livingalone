"use client";

import { myItemsPost } from "@/apis/mypage";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "../EmptyState/EmptyState";
import SkeletonMust from "../wishMust/SkeletonMust";
import { TMainMustPost } from "@/types/types";

function MyMust() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const { data: myMustPosts = [], isPending } = useQuery<TMainMustPost[]>({
    queryKey: ["myMust", userId],
    queryFn: () => myItemsPost(userId),
  });

  if (isPending) return <SkeletonMust />;

  return (
    user && (
      <div>
        <div className="flex items-center justify-center md:block">
          <div className=" font-bold mt-8 md:mt-0 text-[12px] flex items-center justify-center border border-main-8 rounded-full w-[76px] h-[30px] text-main-8 md:border-none md:rounded-none md:text-left md:text-black md:text-[24px] md:w-[115px] md:h-[29px] md:block">
            나의 자취템
          </div>
        </div>
        <div className="mt-8">
          {myMustPosts.length > 0 ? (
            <ul className="grid grid-cols-2 gap-[32px]">
              {myMustPosts.map((post) => (
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
          ) : (
            <EmptyState
              message={
                <>
                  <p>나의 자취템이 없습니다. </p>
                  <p>나만의 자취템을 자랑해주세요!</p>
                </>
              }
            />
          )}
        </div>
      </div>
    )
  );
}

export default MyMust;
