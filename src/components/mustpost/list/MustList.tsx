"use client";

import { getMustPostAll, getMustPostbyCategory } from "@/apis/mustpost";
import { TMustPostList } from "@/types/types";
import { useCategoryStore } from "@/zustand/mustStore";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../search/SearchBar";
import MustCategory from "./MustCategory";
import MustPostCard from "./MustPostCard";
import Title from "./Title";

function MustList() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const {
    data: mustPosts = [],
    isPending,
    isError,
  } = useQuery<TMustPostList[]>({
    queryKey: ["mustPosts", selectedCategory],
    queryFn: selectedCategory === "ALL" ? getMustPostAll : () => getMustPostbyCategory(selectedCategory),
  });

  if (isPending) return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError) return <div className="flex justify-center items-center">데이터를 불러오는데 실패했습니다!</div>;

  if (mustPosts) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Title />
          <div className="flex flex-col justify-center items-center mb-[70px]">
            <SearchBar />
            <MustCategory />
          </div>
        </div>
        {mustPosts.length > 0 ? (
          <div className="min-h-screen flex-col items-center justify-center">
            <ul className="grid grid-cols-3 gap-[32px]">
              {mustPosts.map((post) => (
                <li key={post.id} className="mb-[64px]">
                  <MustPostCard postId={post.id} title={post.title} item={post.item} imgUrl={post.img_url} />
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center">
              <button className="mt-[64px] border border-black py-4 px-8 rounded-full font-bold hover:bg-black hover:text-white">
                더보기
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex justify-center">해당 카테고리에 맞는 게시글이 없습니다.</div>
        )}
      </div>
    );
  }
}

export default MustList;
