import Image from "next/image";
import React from "react";

interface PostImageProps {
  img_url: string;
}
function PostImage({ img_url }: PostImageProps) {
  return (
    <div className="mb-10">
      <Image
        src={img_url}
        alt="상품이미지"
        width={680}
        height={350}
        className="rounded-[16px]"
        // 이미지 크기 수정 필요....
      />
    </div>
  );
}

export default PostImage;
