"use client";

import { getMustPostAll } from "@/apis/mustpost";
import { TMustPostList } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MustPostCard from "../list/MustPostCard";
import Title from "../list/Title";
import ResetButton from "./ResetButton";
import SearchBar from "./SearchBar";

function SearchList() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") as string;

  const {
    data: mustPosts = [],
    isPending,
    isError,
  } = useQuery<TMustPostList[]>({
    queryKey: ["mustPosts"],
    queryFn: getMustPostAll,
  });

  if (isPending) return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError) return <div className="flex justify-center items-center">데이터를 불러오는데 실패했습니다!</div>;

  const searchedList = mustPosts.filter(
    (post) => post.item.includes(searchValue) || post.title.includes(searchValue) || post.content.includes(searchValue)
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Title />
        <div className="flex flex-col justify-center items-center mb-[70px]">
          <SearchBar />
        </div>
      </div>
      {searchedList.length > 0 ? (
        <div className="min-h-screen flex-col items-center justify-center">
          <ul className="grid grid-cols-3 gap-[32px]">
            {searchedList.map((post) => (
              <li key={post.id}>
                <Link href={`/mustpost/read/${post.id}`}>
                  <MustPostCard title={post.title} item={post.item} imgUrl={post.img_url} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center gap-4 mt-[64px]">
            <button className="border border-black py-4 px-8 rounded-full font-bold hover:bg-black hover:text-white">
              더보기
            </button>
            <ResetButton />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-[64px]">
          <div>해당 카테고리에 맞는 게시글이 없습니다.</div>
          <ResetButton />
        </div>
      )}
    </div>
  );
}

export default SearchList;
