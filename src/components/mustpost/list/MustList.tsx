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
import MustPostList from "./MustPostList";

function MustList() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  useEffect(() => {
    return setSelectedCategory("ALL");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Title />
      <div className="flex flex-col justify-center items-center mt-4 md:mb-[64px]">
        <SearchBar />
        <MustCategory />
      </div>
      <MustPostList selectedCategory={selectedCategory} />
    </div>
  );
}
export default MustList;
