import Link from "next/link";

function WriteButton() {
  return (
    <div className="ml-[34px]">
      <button className="rounded-full py-[10px] px-[22px] bg-black text-[20px] text-white font-bold">글쓰기</button>
      <ul className="hidden">
        <li>
          <Link href="/mustpost/write">자취템 자랑하기</Link>
        </li>
        <li>
          <Link href="/grouppost/write">공동구매 만들기</Link>
        </li>
      </ul>
    </div>
  );
}

export default WriteButton;
