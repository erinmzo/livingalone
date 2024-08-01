"use client";
import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import React from "react";
import MustDeleteBtn from "./MustDeleteBtn";

function MustPostAction({ userId, id }: { userId: string; id: string }) {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return null;
  }

  return (
    <>
      {user.id === userId ? (
        <div className="flex justify-center items-center gap-3 pt-[40px]">
          <Link href={`/mustpost/edit/${id}`}>
            <button className="w-[120px] py-[8px] px-[32px] text-gray-1 font-bold text-xl bg-main-8 rounded-full">
              글 수정
            </button>
          </Link>
          <MustDeleteBtn id={id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MustPostAction;
