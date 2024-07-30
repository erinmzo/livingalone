"use client";

import { likeItemPage } from "@/apis/mypage";
import GroupPostCard from "@/components/grouppost/list/GroupPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function LikeItems() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: likePosts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["like", userId],
    queryFn: () => likeItemPage(userId),
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
        <div className="text-[24px] font-bold ml-1">좋아요 공구</div>
        <div className="mt-8">
          {likePosts.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {likePosts.map((post: any) => {
                return (
                  <li key={post.id}>
                    <GroupPostCard
                      application={post.group_posts.group_applications}
                      title={post.group_posts.title}
                      price={post.group_posts.price}
                      peopleNum={post.group_posts.people_num}
                      isFinished={post.group_posts.is_finished}
                      imgUrl={post.group_posts.img_url}
                      startDate={post.group_posts.start_date}
                      endDate={post.group_posts.end_date}
                      postId={post.group_posts.id}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex justify-center items-center text-gray-4">좋아요한 공구가 없습니다.</div>
          )}
        </div>
      </div>
    )
  );
}

export default LikeItems;
