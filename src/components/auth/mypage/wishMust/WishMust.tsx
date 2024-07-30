"use client";

import { wishItem } from "@/apis/mypage";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function WishMust() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: wish = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["wish", userId],
    queryFn: () => wishItem(userId),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );
  if (isError) return <div>에러.. </div>;

  return (
    user && (
      <div>
        <div className="text-[24px] font-bold ml-1">찜한 자취템</div>
        <div className="mt-8">
          {wish.length > 0 ? (
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
          ) : (
            <div className="flex justify-center items-center text-gray-4">찜한 자취템이 없습니다</div>
          )}
        </div>
      </div>
    )
  );
}

export default WishMust;
