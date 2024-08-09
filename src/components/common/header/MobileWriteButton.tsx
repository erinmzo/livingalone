import Link from "next/link";

function MobileWriteButton() {
  return (
    <>
      <div className="z-[998] absolute bottom-[54px] inset-x-0 w-screen py-[64px] bg-white rounded-t-xl">
        <ul className="flex flex-col items-center text-[20px] text-white gap-[32px]">
          <li>
            <Link
              href="/mustpost/write"
              className="block py-[12px] w-[300px] mx-auto rounded-full bg-gray-5 text-center font-bold"
            >
              자취템을 자랑 할래요!
            </Link>
          </li>
          <li>
            <Link
              href="/grouppost/write"
              className="block py-[12px] w-[300px] mx-auto rounded-full bg-main-8 text-center font-bold"
            >
              공구를 할래요!
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MobileWriteButton;
