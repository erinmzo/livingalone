"use client";

import { getMustPostOnSearch } from "@/apis/mustpost";
import { TMustPostList } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Suspense } from "react";
import MustPostCard from "../list/MustPostCard";
import Title from "../list/Title";
import ResetButton from "./ResetButton";
import SearchBar from "./SearchBar";

function SearchList({ searchValue }: { searchValue: string }) {
  const {
    data: mustPosts = [],
    isPending,
    isError,
  } = useQuery<TMustPostList[]>({
    queryKey: ["mustPosts"],
    queryFn: getMustPostOnSearch,
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

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
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
        <div className="flex justify-center items-center gap-4 mb-[70px]">
          <ResetButton />
        </div>
      </div>
      {searchedList.length > 0 ? (
        <div className="min-h-screen flex-col items-center justify-center w-full">
          <ul className="grid grid-cols-3 gap-[32px]">
            {searchedList.map((post) => (
              <li key={post.id}>
                <MustPostCard postId={post.id} title={post.title} item={post.item} imgUrl={post.img_url} />
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
