"use client";

import { likeItemPage } from "@/apis/mypage";
import GroupPostCard from "@/components/grouppost/list/GroupPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import GroupPostCardSkeleton from "./SkeletonLikeItem";

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

  if (isPending) return <GroupPostCardSkeleton />;

  if (isError) return <div>에러..</div>;

  return (
    user && (
      <div>
        <div className="flex items-center justify-center md:block">
          <div
            className=" font-bold text-[12px] flex items-center justify-center border border-main-8 rounded-full w-[76px] h-[30px] text-main-8 
          md:border-none md:rounded-none md:text-left md:text-black md:text-[24px] md:w-[115px] md:h-[29px] md:block "
          >
            좋아요 공구
          </div>
        </div>
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
            <div className="flex flex-col py-[100px] justify-center items-center">
              <Image
                src="/img/icon-empty.png"
                alt="empty"
                width={100}
                height={0}
                className="mb-5"
              />
              <div className="flex justify-center items-center text-gray-4">
                좋아요한 공구가 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default LikeItems;
