"use client";

import { getMustPostAll, getMustPostbyCategory } from "@/apis/mustpost";
import { useCategoryStore } from "@/zustand/mustStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import SearchBar from "../search/SearchBar";
import MustCategory from "./MustCategory";
import MustPostCard from "./MustPostCard";
import Title from "./Title";

function MustList() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["mustPosts", selectedCategory],
    queryFn: async ({ pageParam = 0 }) => {
      const response =
        selectedCategory === "ALL"
          ? await getMustPostAll(pageParam)
          : await getMustPostbyCategory(pageParam, selectedCategory);
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

  const mustPosts = useMemo(
    () => data?.pages?.flatMap((page) => page.posts) || [],
    [data]
  );

  useEffect(() => {
    return setSelectedCategory("ALL");
  }, []);

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
    return (
      <div className="flex justify-center items-center">
        데이터를 불러오는데 실패했습니다!
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <Title />
      <div className="flex flex-col justify-center items-center mt-4 md:mb-[64px]">
        <SearchBar />
        <MustCategory />
      </div>
      {mustPosts.length > 0 ? (
        <div className="w-full min-h-screen flex-col items-center justify-center">
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {mustPosts.map((post) => (
              <li key={post.id} className="mb-[34px] md:mb-[64px]">
                <MustPostCard
                  postId={post.id}
                  title={post.title}
                  item={post.item}
                  imgUrl={post.img_url}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center mt-[48px] mb-[137px] md:mt-[79px]">
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="border border-gray-3 py-[7px] px-4 rounded-full font-bold text-gray-3"
              >
                {isFetchingNextPage ? "로딩중..." : "더보기"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-[400px] md:min-h-screen flex justify-center">
          <div className="flex flex-col justify-center items-center mb-[64px]">
            <div className="relative w-[67px] md:w-[100px] h-[62px] md:h-[94px] mb-5">
              <Image
                src="/img/icon-empty.png"
                alt="empty"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h4 className="text-gray-2 text-[16px] mb-1">
              해당 카테고리에 맞는 게시글이 없습니다.
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}
export default MustList;
