"use client";
import Image from "next/image";
import { useState } from "react";

interface PostImageProps {
  img_url: string;
  link?: string | null;
}
function PostImage({ img_url, link }: PostImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="mb-3 md:mb-6 w-full lg:min-w-[680px]">
      {isLoading && (
        <div className="relative w-full h-[400px] md:h-[680px] border border-gray-2 animate-pulse rounded-[16px]"></div>
      )}
      <div className="relative">
        <Image
          src={img_url}
          alt="상품이미지"
          className={`w-full h-auto rounded-[16px] border border-gray-2 ${
            isLoading ? "hidden" : "block"
          }`}
          width={0}
          height={0}
          priority={true}
          onLoad={() => setIsLoading(false)}
        />

        {link && (
          <a href={link} target="_blank" className="hidden md:block">
            <div className=" cursor-pointer flex justify-center items-center bg-black absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 hover:bg-opacity-50 rounded-[16px]">
              <p className="z-10 opacity-100 text-white">자취템 보러가기</p>
              <Image
                src="/img/icon-up-right.png"
                alt="보러가기 버튼"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          </a>
        )}

        {link && (
          <a href={link} target="_blank" className="md:hidden">
            <div className="absolute bottom-[12px] flex w-full justify-center">
              <button className="md:hidden border border-gray-1 bg-black text-gray-1 bg-opacity-30 h-[30px] px-[90px] rounded-full flex items-center">
                <p>자취템 보러가기</p>
                <Image
                  src="/img/icon-up-right.png"
                  alt="보러가기 버튼"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default PostImage;
