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

  if (isPending) return <div className="flex justify-center items-center min-h-[400px]">로딩중...</div>;

  if (isError)
    return <div className="flex justify-center items-center min-h-[400px]">데이터를 불러오는데 실패했습니다!</div>;

  const searchedList = mustPosts.filter(
    (post) => post.item.includes(searchValue) || post.title.includes(searchValue) || post.content.includes(searchValue)
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Title />
        <div className="flex flex-col justify-center items-center mb-[30px]">
          <SearchBar />
        </div>
        <div className="flex justify-center items-center gap-4 mb-[70px]">
          <ResetButton />
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
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-[64px] min-h-[400px]">
          <div className="mb-[64px]">해당 카테고리에 맞는 게시글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}

export default SearchList;
