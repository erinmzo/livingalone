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
    setIsOpen((prev) => !prev);
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
            className="w-[100px] pl-[2px] py-2 border-b border-gray-3 font-bold text-[18px] text-left text-gray-5"
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
        <ul className="flex flex-col items-start justify-center absolute right-0 w-[100px] border-t-0 border border-gray-4 bg-white py-[4px]">
          {mustCategories?.map((category) => (
            <li
              key={category.id}
              className="w-full text-gray-4 text-[14px] hover:bg-main-2"
            >
              <button
                // onClick={() => handleSelectCategory(category.name)}
                onClick={() => handleSelectCategory(category)}
                className="inline-flex w-full py-[5px] px-[16px]  hover:bg-main-2"
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
