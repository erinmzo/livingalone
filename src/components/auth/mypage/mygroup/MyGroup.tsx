"use client";

import Image from "next/image";
import { useState } from "react";
import ApplyList from "./ApplyList";

function MyGroup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-col">
      <h5 className="font-bold text-[24px] mb-[32px] w-full">나의 정보</h5>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center py-3 cursor-pointer border-b border-t border-black"
      >
        <span className="flex items-center mr-1]">
          {isOpen ? (
            <Image src="/img/icon-toggle-up.png" alt="위" width={20} height={20} />
          ) : (
            <Image src="/img/icon-toggle-down.png" alt="" width={20} height={20} />
          )}
        </span>
        <div className="font-bold w-[250px] truncate">두루마리 휴지 30개 공구합니다!</div>
        <span>2024/07/21 - 2024/08/03</span>
        <span>10명/30명</span>
        <div className="flex">
          <button>진행중</button>|<button className="font-bold">종료</button>
        </div>
      </div>
      {isOpen && <ApplyList />}
    </div>
  );
}

export default MyGroup;
