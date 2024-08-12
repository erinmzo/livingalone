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
      <div className="flex justify-center items-center min-h-[400px]">
        데이터를 불러오는데 실패했습니다!
      </div>
    );

  const searchedList = mustPosts.filter(
    (post) =>
      post.item.includes(searchValue) ||
      post.title.includes(searchValue) ||
      post.content.includes(searchValue)
  );
  return (
    <div className="flex flex-col items-center justify-center pt-[24px] md:pt-0">
      <div className="flex flex-col items-center justify-center">
        <Title />
        <div className="flex flex-col justify-center items-center md:mb-[30px]">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
        <div className="flex justify-center items-center gap-4 mb-9 md:mb-[70px]">
          <ResetButton />
        </div>
      </div>
      {searchedList.length > 0 ? (
        <div className="min-h-screen flex-col items-center justify-center w-full">
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {searchedList.map((post) => (
              <li key={post.id}>
                <MustPostCard
                  postId={post.id}
                  title={post.title}
                  item={post.item}
                  imgUrl={post.img_url}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[400px]">
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
              <span className="text-main-8 text-[17px] font-bold">
                {searchValue}
              </span>
              에 대한 검색 결과가 없습니다.
            </h4>
            <span className="text-gray-2 text-[16px]">
              다른 키워드를 입력해 보세요!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchList;
