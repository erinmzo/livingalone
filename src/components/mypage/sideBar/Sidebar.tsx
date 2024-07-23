import Link from "next/link";

const links = [
  { href: `/mypage/${1}`, label: "나의 정보" },
  { href: `/mypage/${1}/wishmust`, label: "찜한 자취템" },
  { href: `/mypage/${1}/mymust`, label: "나의 자취템" },
  { href: `/mypage/${1}/likegroup`, label: "좋아요 공구" },
  { href: `/mypage/${1}/mygroup`, label: "신청받은 공구" },
  { href: "/my", label: "내가 쓴 공구" },
];

function SideBar() {
  return (
    <div className="flex flex-col w-[208px] h-[539px] items-center p-8 border border-gray-400 rounded-lg bg-white">
      <div className="flex-col text-center mb-10">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-6"></div>
        <div className="text-lg font-semibold mb-4">나는공구왕</div>
      </div>
      <ul className="text-gray-600 space-y-3 text-center">
        {links.map((link) => (
          <li
            key={link.href}
            className="block hover:text-blue-500 hover:text-lg transition-all "
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
