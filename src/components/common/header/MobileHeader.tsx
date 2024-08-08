"use client";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import Alarm from "../alarm/Alarm";
import { useIsOpen } from "@/zustand/isOpenStore";

interface MobileHeaderProps {
  title?: string;
  hamburger?: boolean;
  alarm?: boolean;
}
function MobileHeader({
  title,
  hamburger = false,
  alarm = true,
}: MobileHeaderProps) {
  const user = useAuthStore((state) => state.user);
  const setIsOpenSidebar = useIsOpen((state) => state.setIsOpenSideBar);
  const handleOpenSideBar = () => {
    setIsOpenSidebar(true);
  };
  return (
    <div className="relative md:hidden flex justify-center py-[18px] px-[16px]">
      <div className="absolute left-[16px] top-[18px]">
        {hamburger && (
          <button onClick={handleOpenSideBar}>
            <Image
              src="/img/icon-hamburger.svg"
              alt="마이페이지 메뉴"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {title ? (
        <h1 className="font-bold text-[18px]">{title}</h1>
      ) : (
        <Link href="/">
          <Image src="/img/logo.svg" alt="혼자살때" width={50} height={0} />
        </Link>
      )}
      <div className="absolute right-[16px] top-[18px]">
        {user && alarm && <Alarm />}
      </div>
    </div>
  );
}

export default MobileHeader;
