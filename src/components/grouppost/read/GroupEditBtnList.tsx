"use client";

import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import GroupDeleteBtn from "./GroupDeleteBtn";

function GroupEditBtnList({ userId, id }: { userId: string; id: string }) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {user && user.id === userId ? (
        <div className="flex justify-center md:justify-end gap-2 mb-[17px]">
          <Link href={`/grouppost/edit/${id}`}>
            <button className="w-[120px] py-[10px] font-bold bg-main-8 text-gray-1 text-[20px] rounded-full">
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
