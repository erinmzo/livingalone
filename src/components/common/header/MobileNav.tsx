"use client";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileWriteButton from "./MobileWriteButton";

function MobileNav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="block md:hidden fixed bottom-0 inset-x-0 w-screen h-[76px] flex items-center border-t border-gray-2 bg-white z-[999]">
        <div className="relative w-full mx-auto z-[100]">
          <ul className="w-full min-w-[320px] grid grid-cols-5">
            <li>
              <div className="flex flex-col justify-center items-center gap-[5px]">
                <button onClick={() => setIsOpen((prev) => !prev)} className="flex flex-col items-center gap-[5px]">
                  <Image src="/img/mo-icon-write.svg" alt="글쓰기" width={24} height={24} />
                  <span className="text-[10px]">글쓰기</span>
                </button>
              </div>
            </li>
            <li>
              <Link href="/mustpost">
                <div className="flex flex-col justify-center items-center gap-[5px]">
                  {pathname === "/mustpost" ? (
                    <>
                      <Image src="/img/mo-icon-must-on.svg" alt="자취템" width={24} height={24} />
                      <span className="text-[10px] text-main-7">자취템</span>
                    </>
                  ) : (
                    <>
                      <Image src="/img/mo-icon-must.svg" alt="자취템" width={24} height={24} />
                      <span className="text-[10px]">자취템</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/">
                <div className="flex flex-col justify-center items-center gap-[5px]">
                  {pathname === "/" ? (
                    <>
                      <Image src="/img/mo-icon-home-on.svg" alt="홈" width={24} height={24} />
                      <span className="text-[10px] text-main-7">홈</span>
                    </>
                  ) : (
                    <>
                      <Image src="/img/mo-icon-home.svg" alt="홈" width={24} height={24} />
                      <span className="text-[10px]">홈</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/grouppost">
                <div className="flex flex-col justify-center items-center gap-[5px]">
                  {pathname === "/grouppost" ? (
                    <>
                      <Image src="/img/mo-icon-group-on.svg" alt="공구템" width={24} height={24} />
                      <span className="text-[10px] text-main-7">공구템</span>
                    </>
                  ) : (
                    <>
                      <Image src="/img/mo-icon-group.svg" alt="공구템" width={24} height={24} />
                      <span className="text-[10px]">공구템</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
            <li>
              {user ? (
                <Link href="/mypage">
                  <div className="flex flex-col justify-center items-center gap-[5px]">
                    {pathname === "/mypage" ? (
                      <>
                        <Image src="/img/mo-icon-mypage-on.svg" alt="마이페이지" width={24} height={24} />
                        <span className="text-[10px] text-main-7">마이페이지</span>
                      </>
                    ) : (
                      <>
                        <Image src="/img/mo-icon-mypage.svg" alt="마이페이지" width={24} height={24} />
                        <span className="text-[10px]">마이페이지</span>
                      </>
                    )}
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <div className="flex flex-col justify-center items-center gap-[5px]">
                    {pathname === "/login" || pathname === "/join" ? (
                      <>
                        <Image src="/img/mo-icon-mypage-on.svg" alt="마이페이지" width={24} height={24} />
                        <span className="text-[10px] text-main-7">로그인</span>
                      </>
                    ) : (
                      <>
                        <Image src="/img/mo-icon-mypage.svg" alt="마이페이지" width={24} height={24} />
                        <span className="text-[10px]">로그인</span>
                      </>
                    )}
                  </div>
                </Link>
              )}
            </li>
          </ul>
          {isOpen && <MobileWriteButton />}
        </div>
      </div>
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50"></div>}
    </>
  );
}

export default MobileNav;
