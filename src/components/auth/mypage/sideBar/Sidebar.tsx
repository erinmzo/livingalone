"use client";
import { getMyProfile } from "@/apis/mypage";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

function SideBar() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const links = [
    { href: `/mypage/${1}`, label: "나의 정보" },
    { href: `/mypage/${1}/wishmust`, label: "찜한 자취템" },
    { href: `/mypage/${1}/mymust`, label: "나의 자취템" },
    { href: `/mypage/${1}/likegroup`, label: "좋아요 공구" },
    { href: `/mypage/${1}/applygroup`, label: "신청한 공구" },
    { href: `/mypage/${1}/mygroup`, label: "내가 쓴 공구" },
  ];

  const { data: profile, isPending } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => getMyProfile(userId),
  });

  if (isPending) return <div>로딩 중...</div>;

  if (profile) {
    return (
      <div className="top-0 left-0 flex flex-col justify-center w-[208px] px-[45px] py-[40px] items-center border border-gray-400 rounded-lg bg-white">
        <div className="flex-col justify-center items-center">
          <Image
            className="bg-gray-200 rounded-full mb-6"
            src={profile.profile_image_url}
            alt={profile.nickname}
            width={100}
            height={100}
          />
          <div className="text-[16px] font-semibold text-center">
            {profile.nickname}
          </div>
        </div>
        <ul className="flex flex-col gap-[24px] mt-[40px]">
          {links.map((link) => (
            <li
              key={link.href}
              className="text-[18px] font-medium text-[#b3b3b3] hover:text-blue-500 transition-all "
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SideBar;
