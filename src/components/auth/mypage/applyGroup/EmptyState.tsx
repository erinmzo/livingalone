import React from "react";
import Image from "next/image";
const EmptyState: React.FC = () => (
  <div className="flex flex-col py-[100px] justify-center items-center">
    <Image
      src="/img/icon-empty.png"
      alt="empty"
      width={100}
      height={0}
      className="mb-5"
    />
    <div className="flex justify-center items-center text-gray-4">
      아직 신청한 공구가 없습니다. 마음에 드는 공구가 있다면 신청해보세요!
    </div>
  </div>
);
export default EmptyState;
