import { useIsOpen } from "@/zustand/isOpenStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MobileSideBar() {
  const pathname = usePathname();
  const setIsOpenSideBar = useIsOpen((state) => state.setIsOpenSideBar);

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

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-[998]"
        onClick={handleCloseSideBar}
      />
      <div className="md:hidden z-[999] bg-white absolute left-0 top-[58px] w-[268px] h-full border ">
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
        </div>
      </div>
    </>
  );
}

export default MobileSideBar;
