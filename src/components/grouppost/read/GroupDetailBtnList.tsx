"use client";
import React from "react";
import GroupApplyBtn from "./GroupApplyBtn";
import GroupFinishBtn from "./GroupFinishBtn";
import { useAuthStore } from "@/zustand/authStore";

function GroupDetailBtnList({ userId, id }: { userId: string; id: string }) {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      {user && user.id === userId ? (
        <GroupFinishBtn id={id} />
      ) : (
        <GroupApplyBtn id={id} />
      )}
    </div>
  );
}

export default GroupDetailBtnList;
