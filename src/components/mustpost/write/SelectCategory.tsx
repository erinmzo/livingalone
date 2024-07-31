"use client";
import { getCategories } from "@/apis/mustpost";
import { MustCategory } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface SelectCategoryProps {
  initialCategoryName: string;
  selectCategory: (category: MustCategory) => void;
}
//선택된 카테고리를 MustWriteForm으로 전달

function SelectCategory({
  initialCategoryName,
  selectCategory,
}: SelectCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: mustCategories,
    isPending,
    isError,
  } = useQuery<MustCategory[]>({
    queryKey: ["mustCategory"],
    queryFn: getCategories,
  });

  const handleIsOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleSelectCategory = (category: MustCategory) => {
    setIsOpen(false);
    selectCategory(category);
  };

  if (isPending) return <div>불러오는 중</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="relative">
      <div>
        <div className="flex gap-[2px]">
          <span className="inline-block w-[78px] m-auto py-[5px] text-lg text-gray-4">
            카테고리
          </span>
          <button
            className="w-[164px] pl-[2px] py-2 border-b border-gray-3 font-bold text-[18px] text-gray-2 text-left"
            onClick={handleIsOpen}
          >
            {initialCategoryName}
            <Image
              src="/img/icon-input-must.png"
              alt="카테고리 아이콘"
              width={24}
              height={24}
              className="position absolute right-0 top-[6px]"
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <ul className="flex flex-col items-center justify-center absolute right-0 w-[164px] px-2 border-t-0 border border-gray-4 bg-white ">
          {mustCategories?.map((category) => (
            <li
              key={category.id}
              className="text-right font-medium text-gray-4"
            >
              <button
                // onClick={() => handleSelectCategory(category.name)}
                onClick={() => handleSelectCategory(category)}
                className="w-full py-2 text-right"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectCategory;
