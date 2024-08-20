"use client";

import { useCategoryStore } from "@/zustand/mustStore";
import { useEffect } from "react";
import SearchBar from "../search/SearchBar";
import MustCategory from "./MustCategory";
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
