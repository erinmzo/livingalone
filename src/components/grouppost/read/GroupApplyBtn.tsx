"use client";

import React, { useState } from "react";
import GroupApplyModal from "./GroupApplyModal";

function GroupApplyBtn() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>공구 신청하기</button>
      {isModalOpen && <GroupApplyModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default GroupApplyBtn;
