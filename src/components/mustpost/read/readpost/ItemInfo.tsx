import React from "react";

interface ItemInfoProps {
  item: string;
  price: number;
  location: string;
  name: string;
}

function ItemInfo({ item, price, location, name }: ItemInfoProps) {
  return (
    <div className="flex flex-col gap-3 px-2 py-4 border-b-[1px] border-gray-3">
      <div>
        <span className="inline-flex justify-center w-[73px] py-[6px] px-[15px] border border-main-8 rounded-full font-bold text-xs text-main-8">
          {name}
        </span>
      </div>

      <div className="flex pl-1 justify-between">
        <div>
          <h5 className="text-2xl font-bold mb-1">{item}</h5>
          <span className="text-gray-3 text-[18px]">{location}</span>
        </div>
        <span className="font-bold text-2xl">{price.toLocaleString()}원</span>
      </div>
    </div>
  );
}

export default ItemInfo;
