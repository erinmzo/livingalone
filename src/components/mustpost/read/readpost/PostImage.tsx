import Image from "next/image";

interface PostImageProps {
  img_url: string;
}
function PostImage({ img_url }: PostImageProps) {
  return (
    <div className="mb-6 w-full lg:min-w-[680px]">
      <Image
        src={img_url}
        alt="상품이미지"
        className="rounded-[16px] border border-gray-2 h-auto w-full"
        width={0}
        height={0}
        priority
      />
    </div>
  );
}

export default PostImage;

// 원본 비율에 따르는데 사진의 가로 길이는 680으로 맞추고 세로로 비율이 떨어지게끔
