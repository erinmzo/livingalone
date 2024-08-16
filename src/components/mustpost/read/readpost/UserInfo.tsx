import Wish from "@/components/common/Wish";
import Image from "next/image";
import React from "react";
interface UserInfoProps {
  profile_image_url: string;
  nickname: string;
  created_at: string;
  postId: string;
}
function UserInfo({
  profile_image_url,
  nickname,
  created_at,
  postId,
}: UserInfoProps) {
  return (
    <div className="flex flex-row items-center gap-2 px-1 md:ml-[2px] mb-[15px] md:mb-2 ">
      <div className="flex-shrink-0 relative w-10 h-10">
        <Image
          src={profile_image_url}
          alt="프로필 이미지"
          fill
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[16px] text-black">{nickname}</span>
        <span className="text-[14px] text-gray-3">
          {created_at.split("T").join(" ").substring(0, 10)}
        </span>
      </div>
      <div className="shrink-0 w-[32px] aspect-square ml-auto md:hidden">
        <Wish postId={postId} />
      </div>
    </div>
  );
}

export default UserInfo;
