"use client";
import { useIsOpen } from "@/zustand/isOpenStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function FrontBanner() {
  const isOpenFrontBanner = useIsOpen((state) => state.isOpenFrontBanner);
  const setIsOpenFrontBanner = useIsOpen((state) => state.setIsOpenFrontBanner);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const hideBannerDate = localStorage.getItem("hideBannerDate");

    if (hideBannerDate === today) {
      setIsOpenFrontBanner(false);
    }
  }, [setIsOpenFrontBanner]);

  const handleCloseForToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("hideBannerDate", today);
    setIsOpenFrontBanner(false);
  };
  return (
    <>
      {isOpenFrontBanner && (
        <div className="md:hidden z-[9999] fixed w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="grid-cols-1 bg-white w-[300px] mx-auto">
            <div>
              <Link href="/payment">
                <Image
                  src="/img/front-banner-randombox.png"
                  alt="혼자살때 럭키박스 단돈 1000원"
                  width={300}
                  height={0}
                />
              </Link>
            </div>
            <ul className="flex">
              <li className="border-r border-gray-2 w-[50%] flex justify-center items-center py-[13px]">
                <button onClick={handleCloseForToday} className="block text-gray-3 text-[12px]">
                  오늘 그만 보기
                </button>
              </li>
              <li className="w-[50%] flex justify-center items-center py-[13px]">
                <button onClick={() => setIsOpenFrontBanner(false)} className="block text-gray-3 text-[12px]">
                  닫기
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default FrontBanner;
