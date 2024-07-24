import Wish from "@/components/common/Wish";
import Image from "next/image";
import Link from "next/link";

interface MustPostCardProps {
  postId: string;
  title: string;
  item: string;
  imgUrl: string;
}

function MustPostCard({ postId, title, item, imgUrl }: MustPostCardProps) {
  return (
    <div className="relative">
      <Link href={`/mustpost/read/${postId}`}>
        <div className="overflow-hidden relative aspect-square rounded-lg">
          <Image
            src={imgUrl}
            alt={item}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            quality={75}
          />
        </div>
        <div className="px-2 mt-3">
          <span className="text-[14px] text-[#808080] truncate">{item}</span>
          <h4 className="text-[20px] font-bold truncate">{title}</h4>
        </div>
      </Link>
      <div className="absolute right-[20px] top-[20px]">
        <div className="py-1 px-5 bg-white rounded-full">
          <Wish postId={postId} />
        </div>
      </div>
    </div>
  );
}

export default MustPostCard;
