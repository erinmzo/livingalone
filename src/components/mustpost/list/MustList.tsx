"use client";

import React from "react";
import MustCategory from "./MustCategory";
import SearchItem from "./SearchItem";
import { useQuery } from "@tanstack/react-query";
import { MustPost } from "@/types/types";
import { getMustPostOnMain } from "@/apis/mustpost";
import Link from "next/link";
import MustPostCard from "./MustPostCard";
import Title from "./Title";

function MustList() {
  const {
    data: mustPosts,
    isPending,
    isError,
  } = useQuery<MustPost[]>({
    queryKey: ["mustPosts"],
    queryFn: getMustPostOnMain,
  });

  if (isPending)
    return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError)
    return (
      <div className="flex justify-center items-center">
        데이터를 불러오는데 실패했습니다!
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Title />
        <div className="flex flex-col justify-center items-center mb-[70px]">
          <SearchItem />
          <MustCategory />
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-[32px]">
        {mustPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/mustpost/read/${post.id}`}>
              <MustPostCard
                title={post.title}
                item={post.item}
                imgUrl={post.img_url}
              />
            </Link>
          </li>
        ))}
      </ul>
      <button className="mt-[64px]">더보기</button>
    </div>
  );
}

export default MustList;
