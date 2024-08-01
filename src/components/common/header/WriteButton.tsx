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
        className="rounded-full py-[10px] px-[22px] border border-main-7 bg-main-7 text-[20px] text-white font-bold hover:bg-white hover:text-main-8 hover:border-main-8"
        onClick={handleIsOpen}
      >
        글쓰기
      </button>
      {isOpen && (
        <ul className="z-50 absolute right-[14px] top-[50px] w-[120px] border border-main-7">
          <li className="bg-white text-gray-3 text-[14px] hover:bg-main-7 hover:text-white text-center">
            <Link href="/mustpost/write" className="block py-[10px] ">
              자취템 자랑하기
            </Link>
          </li>
          <li className="bg-white text-gray-3 text-[14px] hover:bg-main-7 hover:text-white text-center border-t border-main-7">
            <Link href="/grouppost/write" className="block py-[10px] ">
              공동구매 만들기
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default WriteButton;
