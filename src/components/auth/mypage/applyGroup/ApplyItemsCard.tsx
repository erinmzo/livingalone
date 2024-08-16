import { GroupApplyItems } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import ApplyItemsDetails from "./ApplyItemsDetails";
import ApplyItemsStatus from "./ApplyItemsStatus";
import ApplyItemsUserInfo from "./ApplyItemsUserInfo";

interface ApplyItemsCardProps {
  apply: GroupApplyItems;
}

const ApplyItemsCard = ({ apply }: ApplyItemsCardProps) => {
  const { group_posts, post_id, user_name, user_phone, user_address } = apply;
  const isFinished = group_posts.is_finished;

  return (
    <li key={apply.id}>
      <div className="md:px-4 md:py-5 border border-gray-2 rounded-lg flex items-center p-4 w-full">
        <div className="flex gap-2">
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center gap-3">
              <Link href={`/grouppost/read/${post_id}`}>
                <Image
                  src={group_posts.img_url}
                  alt="이미지"
                  width={100}
                  height={100}
                  className="object-cover rounded-lg border border-gray-2 w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
                />
              </Link>
              <div className="md:hidden">
                <ApplyItemsStatus isFinished={isFinished} />
              </div>
            </div>
            <div className="flex flex-col items-start gap-[14px] md:hidden">
              <ApplyItemsDetails apply={apply} />
              <div className="flex flex-col text-[14px] items-start gap-1">
                <div className="text-gray-4 font-bold">주문자 정보</div>
                <ApplyItemsUserInfo userName={user_name} userPhone={user_phone} userAddress={user_address} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-[8.5px]">
            <div className="md:flex md:gap-2 hidden">
              <ApplyItemsStatus isFinished={isFinished} />
              <div className="text-gray-4">
                {group_posts.start_date} ~ {group_posts.end_date}
              </div>
            </div>
            <div className="text-black hidden md:block">
              <ApplyItemsDetails apply={apply} />
            </div>
          </div>
        </div>
        <div className="w-[227px] h-[94px] ml-5 flex-col justify-center border-l md:gap-3 border-gray-2 pl-[30px] hidden md:flex">
          <div className="text-gray-4 font-bold">주문자 정보</div>
          <ApplyItemsUserInfo userName={user_name} userPhone={user_phone} userAddress={user_address} />
        </div>
      </div>
    </li>
  );
};

export default ApplyItemsCard;
