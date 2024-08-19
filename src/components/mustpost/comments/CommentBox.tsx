import Image from "next/image";
import React from "react";

interface CommentBoxProps {
  profileImg: string;
  nickname: string;
  content: string;
  date: string;
}

function CommentBox({ profileImg, nickname, content, date }: CommentBoxProps) {
  return (
    <div className="flex flex-row gap-1 w-full p-2 text-gray-4">
      <div className="relative flex-shrink-0 w-6 h-6">
        <Image
          src={profileImg}
          alt="프로필 이미지"
          fill
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col text-[14px]">
        <span className="mb-1">{nickname}</span>
        <p className="mb-[2px] text-[16px] whitespace-pre-wrap break-words text-justify leading-5">
          {content}
        </p>
        <span className="text-gray-2">
          {date.split("T").join(" ").substring(0, 16)}
        </span>
      </div>
    </div>
  );
}

export default CommentBox;
