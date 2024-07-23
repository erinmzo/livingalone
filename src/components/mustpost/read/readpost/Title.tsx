import Wish from "@/components/common/Wish";
import React from "react";

interface TitleProps {
  title: string;
}
function Title({ title }: TitleProps) {
  return (
    <div className="flex flex-row items-center mb-3">
      {/* 제목부분 */}
      <Wish />
      <h2 className="ml-2 font-bold text-2xl ">{title}</h2>
    </div>
  );
}

export default Title;
