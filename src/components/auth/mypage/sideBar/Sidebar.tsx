"use client";
import { getMyProfile } from "@/apis/mypage";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBar() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const pathname = usePathname();

  const links = [
    { href: `/mypage`, label: "나의 정보" },
    { href: `/mypage/wishmust`, label: "찜한 자취템" },
    { href: `/mypage/mymust`, label: "나의 자취템" },
    { href: `/mypage/likegroup`, label: "좋아요 공구" },
    { href: `/mypage/applygroup`, label: "신청한 공구" },
    { href: `/mypage/mygroup`, label: "내가 쓴 공구" },
  ];

  const { data: profile, isPending } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => getMyProfile(userId),
    enabled: !!user,
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

  if (profile)
    return (
      <div className=" flex flex-col justify-center w-[208px] h-[575px] p-4 items-center border border-[#BFC5C3] rounded-lg bg-white">
        <div className="flex-col justify-center items-center mb-8">
          <Image
            className="bg-gray-200 rounded-full mb-6 w-[100px] h-[100px]"
            src={profile?.profile_image_url}
            alt={profile?.nickname}
            width={100}
            height={100}
          />
          <div className="text-[16px] font-bold text-center w-full h-[19px]">{profile?.nickname}</div>
        </div>
        <ul className="flex flex-col gap-[24px] mt-[40px] items-center">
          {links.map((link) => (
            <li
              key={link.href}
              className={`text-[20px] hover:text-gray-5 transition-all ${
                pathname === link.href ? " text-gray-5 font-bold" : "text-gray-2"
              }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  return <div>아무 정보가 없습니다...</div>;
}

export default SideBar;
