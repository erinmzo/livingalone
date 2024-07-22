import Link from "next/link"; // Next.js의 Link 컴포넌트를 임포트

function SideBar() {
  return (
    <div className="flex flex-col w-[200px] h-[500px] items-center p-4 border border-gray-400 rounded-lg bg-white">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
      <div className="text-lg font-semibold mb-4">나는공구왕</div>
      <div className="w-full flex-col justify-center items-center ">
        <h2 className="text-md font-bold mb-2">나의 정보</h2>
        <ul className="text-gray-600 space-y-2">
          <li>
            <Link href="/mypage/wishmust">찜한 자취템</Link>
          </li>
          <li>
            <Link href="/my-items">나의 자취템</Link>
          </li>
          <li>
            <Link href="/liked-tools">좋아요 공구</Link>
          </li>
          <li>
            <Link href="/mypage/applygroup">신청받은 공구</Link>
          </li>
          <li>
            <Link href="/my">내가 쓴 공구</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
