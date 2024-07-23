import React from "react";

interface ItemInfoProps {
  item: string;
  price: number;
  location: string;
  name: string;
}

function ItemInfo({ item, price, location, name }: ItemInfoProps) {
  return (
    <div className="flex flex-col pl-2">
      <div>
        <span className="py-2 px-4 border border-black rounded-full text-xs">
          {name}
        </span>
      </div>
      <div className="flex justify-between mt-3">
        <div>
          <h5 className=" mb-2 text-xl">{item}</h5>
          <span className="text-[#808080]">{location}</span>
        </div>
        <span>{price}</span>
      </div>
    </div>
  );
}

export default ItemInfo;
