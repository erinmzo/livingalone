"use client";
import Image from "next/image";

function TopButton() {
  const topBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={topBtn}
      className="inline-flex justify-center items-center fixed z-50 right-4 md:right-[10%] bottom-[104px] md:bottom-[112px]"
    >
      <Image
        src="/img/icon-top-button.svg"
        alt="top 스크롤 버튼"
        width={40}
        height={40}
      />
    </button>
  );
}

export default TopButton;
