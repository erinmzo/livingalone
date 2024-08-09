"use client";

import { useAuthStore } from "@/zustand/authStore";
import { useIsOpen } from "@/zustand/isOpenStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Notify } from "notiflix";
import React from "react";

function MobileSideBar() {
  const pathname = usePathname();
  const setIsOpenSideBar = useIsOpen((state) => state.setIsOpenSideBar);
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

  const links = [
    { href: `/mypage`, label: "나의 정보" },
    { href: `/mypage/wishmust`, label: "찜한 자취템" },
    { href: `/mypage/mymust`, label: "나의 자취템" },
    { href: `/mypage/likegroup`, label: "좋아요 공구" },
    { href: `/mypage/applygroup`, label: "신청한 공구" },
    { href: `/mypage/mygroup`, label: "내가 쓴 공구" },
    { href: `/mypage/mypayment`, label: "결제 내역" },
  ];

  const handleCloseSideBar = () => {
    setIsOpenSideBar(false);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "DELETE" });
    saveUser(null);
    Notify.success("로그아웃이 되었습니다.");
    router.push("/");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-[998]"
        onClick={handleCloseSideBar}
      />
      <div className="md:hidden z-[999] bg-white absolute left-0 top-[60px] w-[268px] h-full border-r">
        <div>
          <ul className="flex flex-col gap-[24px]  items-center py-11">
            {links.map((link) => (
              <li
                key={link.href}
                className={`text-[18px] hover:text-gray-5 hover:font-bold transition-all text-gray-3 ${
                  pathname === link.href
                    ? "text-gray-5 font-bold"
                    : "text-gray-2"
                }`}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div
            className="flex justify-center items-center text-[18px] hover:font-bold transition-all text-gray-3"
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileSideBar;
