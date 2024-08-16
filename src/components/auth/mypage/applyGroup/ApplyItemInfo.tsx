interface ApplyItemInfoProps {
  title: string;
  startDate: string;
  endDate: string;
  price: number;
  isFinished: boolean;
}

const ApplyItemInfo = ({ title, startDate, endDate, price, isFinished }: ApplyItemInfoProps) => {
  return (
    <div className="flex flex-col">
      <div className="md:hidden flex flex-col">
        <div className="text-gray-4">
          {startDate} ~ {endDate}
        </div>
        <div className="text-black">
          <div className="mb-1">{title}</div>
          <div>{price.toLocaleString()}원</div>
        </div>
      </div>

      <div className="hidden md:flex md:gap-2">
        <div>
          {isFinished ? (
            <span className="md:py-[4px] md:px-[12px] w-[70px] h-[26px] rounded-full bg-gray-2 text-gray-3 text-[12px] font-bold">
              종료됨
            </span>
          ) : (
            <span className="py-[4px] px-[12px] rounded-full bg-main-7 text-white text-[12px] font-bold">진행중</span>
          )}
        </div>
        <div className="text-gray-4">
          {startDate} ~ {endDate}
        </div>
      </div>
      <div className="hidden md:block text-black">
        <div className="mb-1">{title}</div>
        <div>{price.toLocaleString()}원</div>
      </div>
    </div>
  );
};

export default ApplyItemInfo;
