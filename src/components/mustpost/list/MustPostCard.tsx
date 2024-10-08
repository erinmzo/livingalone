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
        <div className="overflow-hidden relative aspect-square rounded-lg border border-gray-2">
          <Image
            src={imgUrl}
            alt={item}
            fill
            sizes="(max-width: 1024px) 70vw, 50vw"
            className="object-cover"
            loading="lazy"
            quality={75}
          />
        </div>
        <div className="px-1 mt-2 md:mt-4">
          <span className="block text-[12px] md:text-[14px] text-gray-3 truncate">{item}</span>
          <h4 className="font-bold text-[16px] md:text-[20px] text-black mt-[3px] md:mt-[6px] truncate">{title}</h4>
        </div>
      </Link>
      <div className="absolute right-[11px] rigth-[10px] md:right-[20px] top-[10px] md:top-[20px] rounded-full">
        <Wish postId={postId} />
      </div>
    </div>
  );
}

export default MustPostCard;
