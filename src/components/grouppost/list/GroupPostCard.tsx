import Image from "next/image";

interface GroupPostCardProps {
  application: {}[];
  title: string;
  price: number;
  peopleNum: number;
  isFinished: boolean;
  imgUrl: string;
  startDate: string;
  endDate: string;
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
}: GroupPostCardProps) {
  return (
    <div>
      <div className="relative aspect-video rounded-lg overflow-hidden">
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
      <div className="px-2">
        <div className="flex items-center gap-3 mt-3">
          <div className="py-1 px-3 rounded-full bg-black text-white text-[12px] font-bold">
            {isFinished ? <span>종료</span> : <span>진행중</span>}
          </div>
          <div className="text-[14px] font-medium text-[#808080]">
            <span>{startDate}</span> ~ <span>{endDate}</span>
          </div>
        </div>
        <h4 className="text-[20px] font-bold truncate mt-[6px]">{title}</h4>
        <div className="flex items-center gap-2 mt-[6px]">
          <span className="text-red-600 text-[20px] font-bold">{peopleNum - application.length}명 남음!</span>
          <span className="text-[24px] font-bold">{price.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}

export default GroupPostCard;
