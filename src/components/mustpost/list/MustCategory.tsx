"use client";
import { getCategories } from "@/apis/mustpost";
import type { MustCategory } from "@/types/types";
import { useCategoryStore } from "@/zustand/mustStore";
import { useQuery } from "@tanstack/react-query";

function MustCategory() {
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const {
    data: mustCategories,
    isPending,
    isError,
  } = useQuery<MustCategory[]>({
    queryKey: ["mustCategory"],
    queryFn: getCategories,
  });

  const handClickCategory = (category: string) => {
    setSelectedCategory(category);
  };

  if (isPending)
    return (
      <ul className="flex flex-row gap-2">
        <li className="w-[90px] h-[37px] py-2 px-4 border border-gray-2 bg-gray-2 rounded-full animate-pulse"></li>
        <li className="w-[90px] h-[37px] py-2 px-4 border border-gray-2 bg-gray-2 rounded-full animate-pulse"></li>
        <li className="w-[90px] h-[37px] py-2 px-4 border border-gray-2 bg-gray-2 rounded-full animate-pulse"></li>
        <li className="w-[90px] h-[37px] py-2 px-4 border border-gray-2 bg-gray-2 rounded-full animate-pulse"></li>
        <li className="w-[90px] h-[37px] py-2 px-4 border border-gray-2 bg-gray-2 rounded-full animate-pulse"></li>
      </ul>
    );

  if (isError)
    return <li className="w-[90px] py-2 px-4 border border-gray-2 bg-gray-2 rounded-full animate-pulse">에러</li>;

  return (
    <div>
      <ul className="flex flex-row gap-2">
        <li>
          <button
            className={`w-[90px] py-2 px-4 border border-gray-3  rounded-full text-gray-3 hover:font-bold hover:bg-main-8 hover:text-white ${
              selectedCategory === "ALL"
                ? "bg-main-8 font-bold text-white border-transparent"
                : "hover:bg-main-8 hover:text-white hover:border-transparent"
            }`}
            onClick={() => handClickCategory("ALL")}
          >
            ALL
          </button>
        </li>
        {mustCategories?.map((category) => (
          <li key={category.id}>
            <button
              className={`w-[90px] py-2 px-4 border border-gray-3 rounded-full text-gray-3 hover:font-bold hover:bg-main-8 hover:text-white  ${
                selectedCategory === category.id
                  ? "bg-main-8 font-bold text-white border-transparent"
                  : "hover:bg-main-8 hover:text-white hover:border-transparent"
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
