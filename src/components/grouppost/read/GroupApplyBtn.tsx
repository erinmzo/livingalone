"use client";

import React, { useState } from "react";
import GroupApplyModal from "./GroupApplyModal";

function GroupApplyBtn({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <button
        className="w-[330px] py-3 text-white font-bold text-[20px] bg-black rounded-full"
        onClick={() => setIsModalOpen(true)}
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
