"use client";

import Image from "next/image";
import { useState } from "react";

function MyGroup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-col ml-auto ">
      <div className="text-2xl font-bold mb-5">신청받은 공구</div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-4 cursor-pointer w-[766px] h-[50px] border-b border-t border-black"
      >
        <div className="flex items-center">
          <div className="mr-4">
            {isOpen ? (
              <Image src="/img/icon-toggle-up.png" alt="위" width={20} height={20} />
            ) : (
              <Image src="/img/icon-toggle-down.png" alt="" width={20} height={20} />
            )}
          </div>
          <div className="text-xl font-bold">두루마리 휴지 30개 공구합니다!</div>
        </div>
        <div className="text-lg">2024/07/21 - 2024/08/03</div>
        <div className="mr-2">10명/30명</div>
        <div className=" text-xl font-bold">진행중/종료</div>
      </div>
      {isOpen && (
        <div className="mt-2">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-400 ">
                <th className="p-2">순서</th>
                <th className="p-2">이름</th>
                <th className="p-2">전화번호</th>
                <th className="p-2">주소</th>
                <th className="p-2 text-right">입금여부</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td className="p-2">숫자</td>
                <td className="p-2">이름</td>
                <td className="p-2">전화번호</td>
                <td className="p-2">주소</td>
                <td className="p-2 text-right">
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGroup;
