"use client";

import { mypageMenu } from "@/constants/mypage";
import { useAuthStore } from "@/zustand/authStore";
import { useIsOpen } from "@/zustand/isOpenStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Notify } from "notiflix";

function MobileSideBar() {
  const pathname = usePathname();
  const isOpenSideBar = useIsOpen((state) => state.isOpenSideBar);
  const setIsOpenSideBar = useIsOpen((state) => state.setIsOpenSideBar);
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

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
        className={`fixed inset-0 top-[60px] transition-all
          ${isOpenSideBar ? "bg-black opacity-50 z-[998]" : "bg-transparent z-[-1]"}
          `}
        onClick={handleCloseSideBar}
      />
      <div
        className={`md:hidden z-[999] bg-white absolute left-0 top-[60px] w-[70%] h-full border-r transition-transform duration-300 ${
          isOpenSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <ul className="flex flex-col gap-[24px] items-center py-11">
            {mypageMenu.map((link) => (
              <li
                key={link.href}
                className={`text-[18px] hover:text-gray-5 hover:font-bold transition-all text-gray-3 ${
                  pathname === link.href ? "text-gray-5 font-bold" : "text-gray-2"
                }`}
                onClick={handleCloseSideBar}
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
