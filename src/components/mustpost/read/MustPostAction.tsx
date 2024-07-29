"use client";
import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import React from "react";
import MustDeleteBtn from "./MustDeleteBtn";

function MustPostAction({ userId, id }: { userId: string; id: string }) {
  const user = useAuthStore((state) => state.user);

  console.log("id", id);
  console.log("userId", userId);

  if (!user) {
    return null;
  }

  return (
    <>
      {user.id === userId ? (
        <div className="flex justify-center items-center gap-2 pt-[40px]">
          <Link href={`/mustpost/edit/${id}`}>
            <button className="w-[197px] py-[10px] text-[#fff] font-bold text-xl bg-black rounded-full">
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
