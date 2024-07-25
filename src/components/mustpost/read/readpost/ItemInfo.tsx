import React from "react";

interface ItemInfoProps {
  item: string;
  price: number;
  location: string;
  name: string;
}

function ItemInfo({ item, price, location, name }: ItemInfoProps) {
  return (
    <div className="flex flex-col gap-3 px-2 py-4 border-b-[1px] border-black">
      <div>
        <span className="inline-flex py-[6px] px-4 border border-black rounded-full text-xs">
          {name}
        </span>
      </div>

      <div className="flex pl-1 justify-between">
        <div>
          <h5 className="font-medium text-xl ">{item}</h5>
          <span className="text-[#808080]">{location}</span>
        </div>
        <span className="font-bold text-2xl">{price.toLocaleString()}원</span>
      </div>
    </div>
  );
}

export default ItemInfo;
