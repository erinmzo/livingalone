interface ApplyItemsUserInfoProps {
  userName: string;
  userPhone: string;
  userAddress: string;
}

const ApplyItemsUserInfo = ({ userName, userPhone, userAddress }: ApplyItemsUserInfoProps) => {
  return (
    <div className="text-gray-3 text-sm flex flex-col gap-1">
      <div className="flex md:flex-col gap-2">
        <div className="border-r md:border-none border-gray-2 pr-2 ">{userName}</div>
        <div>{userPhone}</div>
      </div>
      <div>{userAddress}</div>
    </div>
  );
};

export default ApplyItemsUserInfo;
