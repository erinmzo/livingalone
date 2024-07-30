"use client";
import { getCategories } from "@/apis/mustpost";
import type { MustCategory } from "@/types/types";
import { useCategoryStore } from "@/zustand/mustStore";
import { useQuery } from "@tanstack/react-query";

function MustCategory() {
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );
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
      <ul className="flex flex-row gap-2">
        <li>
          <button
            className={`w-[90px] py-2 px-4 border border-main-8 rounded-full font-bold text-main-8 hover:bg-main-8 hover:text-white ${
              selectedCategory === "ALL"
                ? "bg-main-8 text-white"
                : "hover:bg-main-8 hover:text-white"
            }`}
            onClick={() => handClickCategory("ALL")}
          >
            ALL
          </button>
        </li>
        {mustCategories?.map((category) => (
          <li key={category.id}>
            <button
              className={`w-[90px] py-2 px-4 border border-main-8 rounded-full font-bold text-main-8 hover:bg-main-8 hover:text-white  ${
                selectedCategory === category.id
                  ? "bg-main-8 text-white"
                  : "hover:bg-main-8 hover:text-white"
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
