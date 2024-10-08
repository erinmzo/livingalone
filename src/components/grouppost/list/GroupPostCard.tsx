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
    <div className={`relative ${isFinished ? "text-gray-2" : "text-black"}`}>
      <Link href={`/grouppost/read/${postId}`}>
        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-2">
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 70vw, 50vw"
            className={`object-cover ${isFinished ? "brightness-50" : ""}`}
            loading="lazy"
            quality={75}
          />
          <div></div>
        </div>
        <div className="px-1 mt-[16px]">
          <div className="flex items-center gap-2">
            {isFinished ? (
              <span className="py-[4px] px-[12px] rounded-full bg-gray-2 text-gray-3 text-[12px] font-bold">
                종료됨
              </span>
            ) : (
              <span className="py-[4px] px-[12px] rounded-full bg-main-7 text-white text-[12px] font-bold">진행중</span>
            )}
            <div className={`text-[14px] ${isFinished ? "text-gray-2" : "text-gray-3"}`}>
              <span>{startDate}</span> ~ <span>{endDate}</span>
            </div>
          </div>
          <h4 className="text-[16px] md:text-[24px] font-bold truncate mt-[6px]">{title}</h4>
          <div className="flex items-center gap-2 mt-[6px]">
            <span className={`${isFinished ? "text-gray-2" : "text-red-3"} text-[14px] md:text-[16px] font-bold`}>
              {peopleNum - application.length}명 남음
            </span>
            <span className="text-[18px] md:text-[20px] font-bold">{price.toLocaleString()}원</span>
          </div>
        </div>
      </Link>
      <div className="absolute right-[12px] top-[12px] md:right-[20px] md:top-[20px]">
        <Like postId={postId} />
      </div>
    </div>
  );
}

export default GroupPostCard;
