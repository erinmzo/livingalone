import Link from "next/link";

function ResetButton() {
  return (
    <Link href="/mustpost" className="py-4 px-8 rounded-full bg-[#b3b3b3] text-white font-bold">
      검색초기화
    </Link>
  );
}

export default ResetButton;
