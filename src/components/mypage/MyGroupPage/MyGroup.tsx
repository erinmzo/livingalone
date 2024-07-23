"use client";

import { useState } from "react";

function MyGroup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-4 cursor-pointer w-[766px] h-[50px] "
      >
        <div className="flex items-center">
          <div className="mr-4">{isOpen ? "▾" : "▸"}</div>
          <div className="text-xl font-bold">
            두루마리 휴지 30개 공구합니다!
          </div>
        </div>
        <div className="text-lg">2024/07/21 - 2024/08/03</div>
        <div className="mr-2">10명/30명</div>
        <div className=" text-xl font-bold">진행중/종료</div>
      </div>
    </div>
  );
}

export default MyGroup;
