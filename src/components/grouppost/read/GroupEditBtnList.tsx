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
        <div className="flex justify-center gap-2 mt-[14px]">
          <Link href={`/grouppost/edit/${id}`}>
            <button className="w-[197px] h-[48px] font-bold bg-black text-white text-[20px] rounded-full">
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
