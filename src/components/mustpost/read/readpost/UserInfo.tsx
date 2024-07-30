import Image from "next/image";
import React from "react";
interface UserInfoProps {
  profile_image_url: string;
  nickname: string;
  created_at: string;
}
function UserInfo({ profile_image_url, nickname, created_at }: UserInfoProps) {
  return (
    <div className="flex flex-row items-center gap-2 ml-[2px] mb-[10px]">
      {/* 프로필부분 wrap */}
      <Image
        src={profile_image_url}
        alt="프로필 이미지"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col">
        {/* 닉네임-생성날짜 */}
        <span className="text-[16px]">{nickname}</span>
        <span className="text-[14px] text-gray-3">2024.11.22</span>
      </div>
    </div>
  );
}

export default UserInfo;
