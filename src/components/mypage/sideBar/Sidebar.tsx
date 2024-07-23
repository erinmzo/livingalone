import Link from "next/link";

function SideBar() {
  const links = [
    { href: `/mypage/${1}`, label: "나의 정보" },
    { href: `/mypage/${1}/wishmust`, label: "찜한 자취템" },
    { href: `/mypage/${1}/mymust`, label: "나의 자취템" },
    { href: `/mypage/${1}/likegroup`, label: "좋아요 공구" },
    { href: `/mypage/${1}/applygroup`, label: "신청한 공구" },
    { href: `/mypage/${1}/mygroup`, label: "내가 쓴 공구" },
  ];

  return (
    <div className="top-0 left-0 flex flex-col justify-center w-[208px] px-[45px] py-[40px] items-center border border-gray-400 rounded-lg bg-white">
      <div className="flex-col justify-center items-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-6"></div>
        <div className="text-[16px] font-semibold text-center">나는 공구왕</div>
      </div>
      <ul className="flex flex-col gap-[24px] mt-[64px]">
        {links.map((link) => (
          <li key={link.href} className="text-[20px] font-medium text-[#b3b3b3] hover:text-blue-500 transition-all ">
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
