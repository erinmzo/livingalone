"use client";

import { getGroupPosts } from "@/apis/grouppost";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import GroupPostCard from "./GroupPostCard";

function GroupPostList() {
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
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getGroupPosts(pageParam, isFinished);
      return {
        posts: response.posts,
        total: response.total,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (acc, page) => acc + page.posts.length,
        0
      );
      if (totalFetched >= lastPage.total) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });

  const groupPosts = useMemo(
    () => data?.pages?.flatMap((page) => page.posts) || [],
    [data]
  );

  useEffect(() => {
    refetch();
  }, [isFinished, refetch]);

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/img/loading-spinner.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    );

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;
  return (
    <div>
      <div className="hidden md:flex flex-col items-center justify-center mb-[44px]">
        <h3 className="text-3xl font-bold mb-[8px]">같이 사 공구템</h3>
        <h4 className="text-gray-3">
          공동구매를 통해 자취에 필요한 물품을 저렴한 💰금액에 구매해보세요
        </h4>
      </div>
      <div className="flex item-center justify-center gap-3 mb-[40px] md:mb-[70px]">
        <button
          className={`w-[60px] h-[24px] text-[12px] md:text-[16px] md:w-[90px] md:h-[35px] leading-normal rounded-full font-bold ${
            isFinished === false
              ? "bg-main-8 text-white"
              : "border text-gray-3 md:text-gray-4 border-gray-3 md:border-gray-4 font-normal md:font-bold"
          }`}
          onClick={() => {
            SetIsFinished(false);
          }}
        >
          진행중
        </button>
        <button
          className={`w-[60px] h-[24px] text-[12px] md:text-[16px] md:w-[90px] md:h-[35px] leading-normal rounded-full font-bold ${
            isFinished === true
              ? "bg-main-8 text-white"
              : "border text-gray-3 md:text-gray-4 border-gray-3 md:border-gray-4 font-normal md:font-bold"
          }`}
          onClick={() => {
            SetIsFinished(true);
          }}
        >
          종료됨
        </button>
      </div>
      {groupPosts && groupPosts.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-[64px]">
          {groupPosts.map((post) => {
            return (
              <li key={post.id}>
                <GroupPostCard
                  application={post.group_applications}
                  title={post.title}
                  price={post.price}
                  peopleNum={post.people_num}
                  isFinished={post.is_finished}
                  imgUrl={post.img_url}
                  startDate={post.start_date}
                  endDate={post.end_date}
                  postId={post.id}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex justify-center">
          <p>
            {isFinished
              ? "종료된 공구템 게시물이 없습니다."
              : "진행 중인 공구템 게시물이 없습니다."}
          </p>
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center mt-12 md:mt-[124px] mb-[137px]">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="py-2 px-4 border border-gray-3 md:border-gray-4 text-gray-3 md:text-gray-4 rounded-full font-bold"
          >
            {isFetchingNextPage ? "로딩중..." : "더보기"}
          </button>
        </div>
      )}
    </div>
  );
}

export default GroupPostList;
