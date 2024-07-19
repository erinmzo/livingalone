import Wish from "@/components/common/Wish";
import Image from "next/image";

interface MustPostCardProps {
  title: string;
  item: string;
  imgUrl: string;
}

function MustPostCard({ title, item, imgUrl }: MustPostCardProps) {
  return (
    <div className="relative">
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
      <div className="ml-1 mt-3">
        <span className="text-[14px] text-[#808080] truncate">{item}</span>
        <h4 className="text-[20px] font-bold truncate">{title}</h4>
      </div>
      <Wish />
    </div>
  );
}

export default MustPostCard;
