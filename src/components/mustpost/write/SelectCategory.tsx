"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/apis/mustpost";
import { MustCategory } from "@/types/types";

function SelectCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("카테고리 선택");
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

  const handleSelectCategory = (name: string) => {
    setSelectedCategory(name);
    setIsOpen(false);
  };

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="relative">
      <div>
        <div className="flex gap-2">
          <span className="w-[78px] m-auto py-1 text-xl font-bold">
            카테고리
          </span>
          <button
            className="w-[164px] border-b border-black"
            onClick={handleIsOpen}
          >
            {selectedCategory}
            <Image
              // selectedCategory
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
        <ul className="absolute right-0 px-2 bg-[#E6E6E6] w-[164px]">
          {mustCategories?.map((category) => (
            <li
              key={category.id}
              className=" border-b border-black text-right font-medium"
            >
              <button
                onClick={() => handleSelectCategory(category.name)}
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

// Input이 있음
// 카테고리 리스트가 있음
// Input을 눌렀을때 isOpen으로 카테고리 리스트가 열림 다시 누르면 닫힘
// 선택한 카테고리가 Input의 값으로 들어갈 수 있게
