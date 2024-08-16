import React from "react";

interface ItemInfoProps {
  item: string;
  price: number;
  location: string;
  name: string;
}

function ItemInfo({ item, price, location, name }: ItemInfoProps) {
  return (
    <div className="flex flex-col gap-2 md:gap-3 px-2 py-4 md:py-3">
      <div>
        <span className="inline-flex justify-center w-[58px] md:w-[73px] py-1 md:py-[8px] px-3 md:px-4 bg-main-7 rounded-full font-bold text-[10px] md:text-xs text-gray-1">
          {name}
        </span>
      </div>

      <div className="flex md:pl-1 justify-between">
        <div>
          <h5 className="mb-1 pl-1 md:pl-0 text-[22px] md:text-2xl font-bold text-black">
            {item}
          </h5>
          <span className="pl-1 md:pl-0 text-gray-3 text-[18px]">
            {location}
          </span>
          <span className="block mt-2 font-bold text-[18px] text-black md:hidden">
            {price.toLocaleString()}원
          </span>
        </div>
        <span className="shrink-0 hidden font-bold text-2xl text-black md:inline">
          {price.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}

export default ItemInfo;
