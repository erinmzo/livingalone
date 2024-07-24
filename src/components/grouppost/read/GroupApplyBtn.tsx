"use client";

import React, { useState } from "react";
import GroupApplyModal from "./GroupApplyModal";
import { useAuthStore } from "@/zustand/authStore";

function GroupApplyBtn({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <button
        className="w-[330px] py-3 text-white font-bold text-[20px] bg-black rounded-full"
        onClick={() => {
          if (!user) {
            alert("로그인한 사용자만 신청할 수 있습니다.");
            return;
          }
          setIsModalOpen(true);
        }}
      >
        공구 신청하기
      </button>
      {isModalOpen && (
        <GroupApplyModal id={id} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default GroupApplyBtn;
