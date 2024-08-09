"use client";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";

function MobileNav() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="block md:hidden z-[999] fixed bottom-0 left-0 w-screen h-[67px] flex items-center border-t border-slate-300 bg-white">
      <ul className="grid grid-cols-5 max-w-[375px] min-w-[320px] mx-auto">
        <li>
          <div className="flex flex-col justify-center items-center gap-[5px]">
            <button className="flex flex-col items-center gap-[5px]">
              <Image
                src="/img/mo-icon-write.svg"
                alt="글쓰기"
                width={24}
                height={24}
              />
              <span className="text-[10px] text-slate-500">글쓰기</span>
            </button>
          </div>
        </li>
        <li>
          <Link href="/mustpost">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image
                src="/img/mo-icon-must.svg"
                alt="자취템"
                width={24}
                height={24}
              />
              <span className="text-[10px] text-slate-500">자취템</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image
                src="/img/mo-icon-home.svg"
                alt="홈"
                width={24}
                height={24}
              />
              <span className="text-[10px] text-slate-500">홈</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/grouppost">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image
                src="/img/mo-icon-group.svg"
                alt="공구템"
                width={24}
                height={24}
              />
              <span className="text-[10px] text-slate-500">공구템</span>
            </div>
          </Link>
        </li>
        <li>
          {user ? (
            <Link href="/mypage">
              <div className="flex flex-col justify-center items-center gap-[5px]">
                <Image
                  src="/img/mo-icon-mypage.svg"
                  alt="마이페이지"
                  width={24}
                  height={24}
                />
                <span className="text-[10px] text-slate-500">마이페이지</span>
              </div>
            </Link>
          ) : (
            <Link href="login">
              <div className="flex flex-col justify-center items-center gap-[5px]">
                <Image
                  src="/img/mo-icon-mypage.svg"
                  alt="마이페이지"
                  width={24}
                  height={24}
                />
                <span className="text-[10px] text-slate-500">로그인</span>
              </div>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
