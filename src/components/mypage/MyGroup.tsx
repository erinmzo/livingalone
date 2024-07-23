"use client";

import Image from "next/image";
import { useState } from "react";

function MyGroup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-col w-auto grow pl-[50px]">
      <h5 className="font-bold text-[24px] mb-[32px]">나의 정보</h5>
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
      {isOpen && (
        <div className="mt-2">
          <table className="w-full text-left">
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="30%" />
              <col width="40%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr className="text-sm text-gray-400">
                <th className="p-2">순서</th>
                <th className="p-2">이름</th>
                <th className="p-2">전화번호</th>
                <th className="p-2">주소</th>
                <th className="p-2 text-center">입금여부</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td className="p-2">숫자</td>
                <td className="p-2">이름</td>
                <td className="p-2">전화번호</td>
                <td className="p-2">주소</td>
                <td className="p-2 text-center">
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
