import Image from "next/image";
import React from "react";
interface UserInfoProps {
  profile_image_url: string;
  nickname: string;
  created_at: string;
}
function UserInfo({ profile_image_url, nickname, created_at }: UserInfoProps) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(new Date(created_at).getTime() - offset);
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <div className="flex flex-row items-center gap-2 ml-[2px] mb-[10px]">
      <Image
        src={profile_image_url}
        alt="프로필 이미지"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-[16px] text-black">{nickname}</span>
        <span className="text-[14px] text-gray-3">{formattedDate}</span>
      </div>
    </div>
  );
}

export default UserInfo;
