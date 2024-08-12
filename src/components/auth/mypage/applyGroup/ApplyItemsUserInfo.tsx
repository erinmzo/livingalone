import React from "react";

interface ApplyItemsUserInfoProps {
  userName: string;
  userPhone: string;
  userAddress: string;
}

const ApplyItemsUserInfo: React.FC<ApplyItemsUserInfoProps> = ({
  userName,
  userPhone,
  userAddress,
}) => {
  return (
    <div className="text-gray-3 text-sm flex flex-col gap-1">
      <div className="flex gap-2">
        <div className="border-r border-gray-2 pr-2">{userName}</div>
        <div>{userPhone}</div>
      </div>
      <div>{userAddress}</div>
    </div>
  );
};

export default ApplyItemsUserInfo;
