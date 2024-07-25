"use client";
import { getCategories } from "@/apis/mustpost";
import type { MustCategory } from "@/types/types";
import { useCategoryStore } from "@/zustand/mustStore";
import { useQuery } from "@tanstack/react-query";

function MustCategory() {
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const { data: mustCategories } = useQuery<MustCategory[]>({
    queryKey: ["mustCategory"],
    queryFn: getCategories,
  });

  const handClickCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <ul className="flex flex-row gap-3">
        <li>
          <button
            className={`py-2 px-4 border border-black rounded-full hover:bg-black hover:text-white ${
              selectedCategory === "ALL" ? "bg-black text-white" : "hover:bg-black hover:text-white"
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
                selectedCategory === category.id ? "bg-black text-white" : "hover:bg-black hover:text-white"
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
