"use client";

import { myItemsPost } from "@/apis/mypage";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function MyMust() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: myMustPosts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["liek", userId],
    queryFn: () => myItemsPost(userId),
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
        <div className="text-[24px] font-bold ml-1">나의 자취템</div>
        <div className="mt-8">
          {myMustPosts.length > 0 ? (
            <ul className="grid grid-cols-2 gap-[32px]">
              {myMustPosts.map((post: any) => (
                <li key={post.id} className="mb-[64px]">
                  <MustPostCard postId={post.id} title={post.title} item={post.item} imgUrl={post.img_url} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center text-gray-4">
              나의 자취템이 없습니다. 나만의 자취템을 자랑해주세요!
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default MyMust;
