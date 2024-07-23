"use client";

import { getGroupPosts, getGroupPostOnMain } from "@/apis/grouppost";
import { GroupApplication, GroupPost } from "@/types/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import GroupPostCard from "./GroupPostCard";
import { useEffect, useMemo, useState } from "react";

type TGroupApplication = Pick<GroupApplication, "id">;
type TGroupApplications = {
  group_applications: TGroupApplication[];
};
type TMainGroupPost = Pick<
  GroupPost,
  | "id"
  | "title"
  | "price"
  | "people_num"
  | "is_finished"
  | "img_url"
  | "start_date"
  | "end_date"
> &
  TGroupApplications;

function PostList() {
  const [isFinished, SetIsFinished] = useState<boolean>(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["groupPosts", isFinished],
    queryFn: ({ pageParam = 0 }) => getGroupPosts(pageParam, isFinished),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 4) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: Infinity,
  });

  const groupPosts = useMemo(
    () => data?.pages?.flatMap((page) => page) || [],
    [data]
  );

  useEffect(() => {
    refetch(); // isFinished 상태가 변경될 때마다 refetch 실행
  }, [isFinished, refetch]);

  if (isPending)
    return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-[44px]">
        <h3 className="text-3xl font-bold mb-[8px]">같이 사 공구템</h3>
        <h4 className="text-[#818181]">
          공동구매를 통해 자취에 필요한 물품을 저렴한 💰금액에 구매해보세요
        </h4>
      </div>
      <div className="flex item-center justify-center gap-3 mb-[70px]">
        <button
          className={`px-4 py-2 rounded-full ${
            isFinished === false
              ? "bg-black text-white font-bold"
              : "border border-black"
          }`}
          onClick={() => {
            SetIsFinished(false);
          }}
        >
          진행중
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            isFinished === true
              ? "bg-black text-white font-bold"
              : "border border-black"
          }`}
          onClick={() => {
            SetIsFinished(true);
          }}
        >
          종료됨
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groupPosts &&
          groupPosts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/grouppost/read/${post.id}`}>
                  <GroupPostCard
                    application={post.group_applications}
                    title={post.title}
                    price={post.price}
                    peopleNum={post.people_num}
                    isFinished={post.is_finished}
                    imgUrl={post.img_url}
                    startDate={post.start_date}
                    endDate={post.end_date}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
      <div className="flex justify-center mt-[124px]">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="py-4 px-8 border border-black rounded-full"
          >
            {isFetchingNextPage ? "로딩중..." : "더보기"}
          </button>
        )}
      </div>
    </div>
  );
}

export default PostList;
