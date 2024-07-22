"use client";

import React, { useState } from "react";
import GroupApplyModal from "./GroupApplyModal";

function GroupApplyBtn({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>공구 신청하기</button>
      {isModalOpen && (
        <GroupApplyModal id={id} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default GroupApplyBtn;
