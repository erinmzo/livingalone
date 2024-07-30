"use client";
import Link from "next/link";
import { useState } from "react";

function WriteButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative ml-[34px] hidden sm:block">
      <button
        className="rounded-full py-[10px] px-[22px] border border-main-8 bg-main-8 text-[20px] text-white font-bold hover:bg-white hover:text-main-8"
        onClick={handleIsOpen}
      >
        글쓰기
      </button>
      {isOpen && (
        <ul className="z-50 absolute right-[14px] top-[50px] overflow-hidden rounded-lg w-[145px]">
          <li className="bg-main-8 text-white text-[16px] font-bold">
            <Link href="/mustpost/write" className="block py-[10px] px-[22px]">
              자취템 자랑하기
            </Link>
          </li>
          <li className="border-t border-white bg-main-8 text-white text-[16px] font-bold">
            <Link href="/grouppost/write" className="block py-[8px] px-[18px]">
              공동구매 만들기
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default WriteButton;
