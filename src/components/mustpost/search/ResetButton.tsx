import Link from "next/link";

function ResetButton() {
  return (
    <Link
      href="/mustpost"
      className="w-[100px] py-[8px] px-[16px] rounded-full bg-main-7 text-[16px] text-gray-1 font-bold"
    >
      검색초기화
    </Link>
  );
}

export default ResetButton;
