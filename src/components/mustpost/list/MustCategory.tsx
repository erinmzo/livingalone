"use client";
import { getCategories } from "@/apis/mustpost";
import type { MustCategory } from "@/types/types";
import { useWishStore } from "@/zustand/mustStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function MustCategory() {
  const [isSelected, setIsSelected] = useState<string>("ALL");

  const { data: mustCategories } = useQuery<MustCategory[]>({
    queryKey: ["mustCategory"],
    queryFn: getCategories,
  });

  const setSelectedCategory = useWishStore((state) => state.setSelectedCategory);

  const handClickCategory = (category: string) => {
    setIsSelected(category);
    setSelectedCategory(category);
  };

  return (
    <div>
      <ul className="flex flex-row gap-3">
        <li>
          <button
            className={`py-2 px-4 border border-black rounded-full hover:bg-black hover:text-white ${
              isSelected === "ALL" ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
            onClick={() => handClickCategory("ALL")}
          >
            ALL
          </button>
        </li>
        {mustCategories?.map((category) => (
          <li key={category.id}>
            <button
              className={`py-2 px-4 border border-black rounded-full hover:bg-black hover:text-white  ${
                isSelected === category.id ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
              onClick={() => handClickCategory(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MustCategory;
