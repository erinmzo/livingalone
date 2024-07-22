import Image from "next/image";
import React from "react";

function SearchItem() {
  return (
    <div className="flex flex-row w-[420px] mb-5 py-[10px] px-2 border-b-2 border-black">
      <Image
        src="/img/search.png"
        alt="검색버튼"
        width={29}
        height={32}
      ></Image>
      <input type="text" placeholder="#여름필수템" className="ml-5" />
    </div>
  );
}

export default SearchItem;
