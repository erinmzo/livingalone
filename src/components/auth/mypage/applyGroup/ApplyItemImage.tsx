import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ApplyItemImageProps {
  imgUrl: string;
  postId: string;
  isFinished: boolean;
}

const ApplyItemImage: React.FC<ApplyItemImageProps> = ({
  imgUrl,
  postId,
  isFinished,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Link href={`/grouppost/read/${postId}`}>
        <Image
          src={imgUrl}
          alt="이미지"
          width={100}
          height={100}
          className="rounded-lg border border-gray-2"
        />
      </Link>
      <div className="md:hidden">
        {isFinished ? (
          <span className="py-[4px] px-[12px] rounded-full bg-gray-2 text-gray-3 text-[12px] font-bold">
            종료됨
          </span>
        ) : (
          <span className="py-[4px] px-[12px] rounded-full bg-main-7 text-white text-[12px] font-bold">
            진행중
          </span>
        )}
      </div>
    </div>
  );
};

export default ApplyItemImage;
