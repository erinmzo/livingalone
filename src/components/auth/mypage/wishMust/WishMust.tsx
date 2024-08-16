"use client";

import { wishItem } from "@/apis/mypage";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import SkeletonMust from "./SkeletonMust";
import EmptyState from "../EmptyState/EmptyState";

function WishMust() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const { data: wish = [], isPending } = useQuery({
    queryKey: ["wish", userId],
    queryFn: () => wishItem(userId),
  });

  if (isPending) return <SkeletonMust />;

  return (
    user && (
      <div>
        <div className="flex items-center justify-center md:block">
          <div
            className="font-bold mt-8 md:mt-0 text-[12px] flex items-center justify-center border border-main-8 rounded-full w-[76px] h-[30px] text-main-8 
          md:border-none md:rounded-none md:text-left md:text-black md:text-[24px] md:w-[115px] md:h-[29px] md:block "
          >
            찜한 자취템
          </div>
        </div>
        <div className="mt-8">
          {wish.length > 0 ? (
            <ul className="grid grid-cols-2 gap-[16px]">
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
          ) : (
            <EmptyState message="찜한 자취템이 없습니다." />
          )}
        </div>
      </div>
    )
  );
}

export default WishMust;
