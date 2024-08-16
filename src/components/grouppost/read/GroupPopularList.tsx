"use client";

import { getGroupPostsOnDetail } from "@/apis/grouppost";
import { TPopularGroupPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import GroupPostCard from "../list/GroupPostCard";

function GroupPopularList({ id }: { id: string }) {
  const {
    data: groupPosts,
    isPending,
    isError,
  } = useQuery<TPopularGroupPost[]>({
    queryKey: ["popularGroupPosts"],
    queryFn: getGroupPostsOnDetail,
  });
  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

  if (isError) return <div className="flex justify-center items-center">에러...</div>;

  // a,b 타입 설정
  const sortedGroupPosts = groupPosts
    .filter((groupPost) => {
      return groupPost.id !== id;
    })
    .sort((a: TPopularGroupPost, b: TPopularGroupPost) => {
      return b.group_likes.length - a.group_likes.length;
    })
    .slice(0, 2);

  return (
    <>
      <h6 className="text-[18px] md:text-[26px] font-bold mb-6 mt-[64px] md:mt-[128px]">인기 공구템</h6>
      <div className="overflow-x-scroll">
        <ul className="min-w-[548px] md:w-auto grid grid-cols-2 gap-8 px-[16px] lg:px-0 z-[10]">
          {sortedGroupPosts.map((post) => {
            return (
              <li key={post.id}>
                <GroupPostCard
                  postId={post.id}
                  application={post.group_applications}
                  title={post.title}
                  price={post.price}
                  peopleNum={post.people_num}
                  isFinished={post.is_finished}
                  imgUrl={post.img_url}
                  startDate={post.start_date}
                  endDate={post.end_date}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default GroupPopularList;
