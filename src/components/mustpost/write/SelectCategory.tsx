"use client";
import { getCategories } from "@/apis/mustpost";
import { MustCategory } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface SelectCategoryProps {
  initialCategoryName: string;
  selectCategory: (category: MustCategory) => void;
  error: string;
}

function SelectCategory({ initialCategoryName, selectCategory, error }: SelectCategoryProps) {
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

  if (isPending)
    return (
      <div className="flex gap-[2px] items-center justify-center">
        <span className="flex w-[70px] md:w-[78px] h-[38px] py-2 md:py-[5px] text-[16px] md:text-lg text-gray-4">
          카테고리
        </span>
        <span className="inline-block w-[100px] h-[38px] pl-[2px] border-b border-gray-3 box-border"></span>
      </div>
    );

  if (isError) return <div>데이터 로딩에 실패했습니다!</div>;

  return (
    <div className="relative">
      <div>
        <div className="flex gap-[2px] items-start">
          <span className="flex w-[70px] md:w-[78px] h-[38px] items-center py-2 md:py-[5px] text-[16px] md:text-lg text-gray-4">
            카테고리
          </span>
          <div className="relative">
            <button
              className="relative w-[100px] pl-[2px] py-2 border-b border-gray-3 font-bold text-[16px] md:text-[18px] text-left text-gray-5"
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
            {isOpen && (
              <ul className="z-[9999] flex flex-col items-start justify-center absolute left-0 w-[100px] border-t-0 border border-gray-4 bg-white py-[4px]">
                {mustCategories?.map((category) => (
                  <li key={category.id} className="w-full text-gray-4 text-[14px] hover:bg-main-2">
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
            {error && <p className={`text-red-3 text-[12px] mt-2`}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;
