import Link from "next/link";

function ResetButton() {
  return (
    <Link
      href="/mustpost"
      className="py-[8px] px-[19px] rounded-full bg-gray-2 text-xl text-gray-4 font-bold"
    >
      검색 초기화
    </Link>
  );
}

export default ResetButton;
