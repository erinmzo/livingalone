"use client";
import Image from "next/image";
import { useState } from "react";

interface PostImageProps {
  img_url: string;
}
function PostImage({ img_url }: PostImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="mb-3 md:mb-6 w-full lg:min-w-[680px]">
      {isLoading && (
        <div className="w-[680px] h-[680px] border border-gray-2 animate-pulse rounded-[16px]"></div>
      )}
      <Image
        src={img_url}
        alt="상품이미지"
        className={`rounded-[16px] border border-gray-2 h-auto w-full ${
          isLoading ? "hidden" : "block"
        }`}
        width={0}
        height={0}
        priority
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}

export default PostImage;

// 원본 비율에 따르는데 사진의 가로 길이는 680으로 맞추고 세로로 비율이 떨어지게끔
