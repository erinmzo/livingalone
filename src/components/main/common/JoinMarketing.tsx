"use client";
import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";

function JoinMarketing() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-col justify-center items-center pb-[150px] px-[16px]">
      <span className="text-[60px] md:text-[90px]">👑</span>
      <p className="text-[30px] md:text-[48px] text-center font-bold mt-[10px]">
        혼자 살 때 <span className="text-main-7">멋진</span> 우리!
        <br />
        <span className="text-main-7">멋진 우리만의 커뮤니티!</span>
      </p>
      {!user ? (
        <Link
          href="/join"
          className="mt-[30px] px-[70px] py-[10px] md:py-[16px] bg-main-8 text-white rounded-full text-[20px] md:text-[26px] font-bold"
        >
          혼자살때 가입하기
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default JoinMarketing;
