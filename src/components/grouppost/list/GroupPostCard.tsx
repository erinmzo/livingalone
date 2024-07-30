import Like from "@/components/common/Like";
import Image from "next/image";
import Link from "next/link";

interface GroupPostCardProps {
  application: {}[];
  title: string;
  price: number;
  peopleNum: number;
  isFinished: boolean;
  imgUrl: string;
  startDate: string;
  endDate: string;
  postId: string;
}
function GroupPostCard({
  application,
  title,
  price,
  peopleNum,
  isFinished,
  imgUrl,
  startDate,
  endDate,
  postId,
}: GroupPostCardProps) {
  return (
    <div className="relative">
      <Link href={`/grouppost/read/${postId}`}>
        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-2">
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            quality={75}
          />
        </div>
        <div className="px-1 mt-[16px]">
          <div className="flex items-center gap-2">
            {isFinished ? (
              <span className="py-[4px] px-[12px] rounded-full bg-main-3 text-main-8 text-[12px] font-bold">종료</span>
            ) : (
              <span className="py-[4px] px-[12px] rounded-full bg-main-7 text-white text-[12px] font-bold">진행중</span>
            )}
            <div className="text-[14px] text-gray-3">
              <span>{startDate}</span> ~ <span>{endDate}</span>
            </div>
          </div>
          <h4 className="text-[22px] font-medium truncate mt-[6px]">{title}</h4>
          <div className="flex items-baseline gap-2 mt-[6px]">
            <span className="text-red-3 text-[16px] font-bold">{peopleNum - application.length}명 남음!</span>
            <span className="text-[20px] font-bold">{price.toLocaleString()}원</span>
          </div>
        </div>
      </Link>
      <div className="absolute right-[20px] top-[20px]">
        <Like postId={postId} />
      </div>
    </div>
  );
}

export default GroupPostCard;
