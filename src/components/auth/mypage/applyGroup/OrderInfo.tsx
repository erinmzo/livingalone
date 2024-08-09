import React from "react";

interface OrdererInfoProps {
  userName: string;
  userPhone: string;
  userAddress: string;
}

const OrdererInfo: React.FC<OrdererInfoProps> = ({
  userName,
  userPhone,
  userAddress,
}) => {
  return (
    <>
      <div className="w-[227px] h-[94px] ml-5 flex flex-col justify-center md:hidden">
        <div className="text-gray-4 mb-2 font-bold">주문자 정보</div>
        <div className="text-gray-3 text-sm">
          <div>{userName}</div>
          <div>{userPhone}</div>
          <div>{userAddress}</div>
        </div>
      </div>
      <div className="hidden md:block w-[227px] h-[94px] ml-5 flex flex-col justify-center">
        <div className="text-gray-4 mb-2 font-bold">주문자 정보</div>
        <div className="text-gray-3 text-sm">
          <div>{userName}</div>
          <div>{userPhone}</div>
          <div>{userAddress}</div>
        </div>
      </div>
    </>
  );
};

export default OrdererInfo;
