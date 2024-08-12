import Link from "next/link";

function ResetButton() {
  return (
    <Link
      href="/mustpost"
      className="w-[67px] md:w-[100px] py-[5px] md:py-[8px] px-2 md:px-[16px] rounded-full bg-main-7 text-[12px] md:text-[16px] text-gray-1 font-bold"
    >
      검색초기화
    </Link>
  );
}

export default ResetButton;
