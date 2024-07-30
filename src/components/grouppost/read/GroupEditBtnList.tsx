"use client";

import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import React from "react";
import GroupDeleteBtn from "./GroupDeleteBtn";

function GroupEditBtnList({ userId, id }: { userId: string; id: string }) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {user && user.id === userId ? (
        <div className="flex justify-center gap-2 mt-[64px]">
          <Link href={`/grouppost/edit/${id}`}>
            <button className="w-[100px] h-[44px] font-bold bg-main-8 text-white text-[20px] rounded-full">
              글 수정
            </button>
          </Link>
          <GroupDeleteBtn id={id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default GroupEditBtnList;
