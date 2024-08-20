"use client";
import { getMyProfile } from "@/apis/mypage";
import { mypageMenu } from "@/constants/mypage";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SkeletonSideBar from "./SkeletonSideBar";

function SideBar() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const pathname = usePathname();

  const { data: profile, isPending } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => getMyProfile(userId),
    enabled: !!user,
  });

  if (isPending) return <SkeletonSideBar />;

  if (profile)
    return (
      <div className=" md:flex flex-col hidden justify-center w-[208px] h-[600px] items-center border border-gray-2 rounded-lg bg-white shrink-0">
        <div className="flex-col justify-center  items-center mb-8">
          <div className="w-full flex justify-center">
            <Image
              className="object-cover border border-gray-2 bg-gray-200 rounded-full mb-6 w-[100px] h-[100px]"
              src={profile?.profile_image_url}
              alt={profile?.nickname}
              width={100}
              height={100}
            />
          </div>
          <div className="text-[16px] font-bold text-center w-full h-[19px]">
            {profile?.nickname}
          </div>
        </div>
        <ul className="flex flex-col gap-[24px] items-start">
          {mypageMenu.map((link) => (
            <li
              key={link.href}
              className={`text-[18px] hover:text-gray-5 hover:font-bold transition-all ${
                pathname === link.href
                  ? " text-gray-5 font-bold"
                  : "text-gray-2"
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
