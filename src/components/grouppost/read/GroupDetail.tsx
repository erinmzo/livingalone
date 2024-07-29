import { getGroupDetail } from "@/apis/grouppost";
import Like from "@/components/common/Like";
import { GroupPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import GroupContent from "./GroupContent";
import GroupDetailBtnList from "./GroupDetailBtnList";
import GroupEditBtnList from "./GroupEditBtnList";

type Props = {
  params: { id: string };
};

type TGroupPostDetail = {
  profiles: {
    nickname: string;
    profile_image_url: string;
  };
  group_applications: {}[];
} & GroupPost;

async function GroupDetail({ params }: Props) {
  const { id } = params;
  const data = await getGroupDetail(id);
  if (!data) {
    return <div>로딩 중입니다.</div>;
  }
  const {
    title,
    content,
    item,
    price,
    people_num,
    start_date,
    end_date,
    link,
    is_finished,
    img_url,
    group_applications,
    user_id,
    profiles: { nickname, profile_image_url },
  } = data as TGroupPostDetail;
  return (
    <div className={`${is_finished ? "text-[#B3B3B3]" : ""}`}>
      <div className="relative overflow-hidden rounded-lg">
        <Image src={img_url} alt="공구템 이미지" width={680} height={500} className="border rounded-lg" />
        {link && (
          <Link href={link}>
            <div className=" cursor-pointer flex justify-center items-center bg-black absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 hover:bg-opacity-50">
              <p className="z-10 opacity-100 text-white">공구템 보러가기</p>
            </div>
          </Link>
        )}

        <div className="absolute bottom-5 left-5 py-1 px-5 bg-white rounded-full">
          <Like postId={id} />
        </div>
      </div>
      <div className="flex justify-between mt-[23px]">
        <div className="flex gap-2 items-center">
          <Image src={profile_image_url} alt="프로필 사진" width={40} height={40} className="rounded-full" />
          <div>
            <p>{nickname}</p>
            <p className="text-[12px] text-[#757575]">{start_date}</p>
          </div>
        </div>
        <div className="flex">
          <p className="font-bold text-[20px]">
            달성률 <span className="text-[36px]">{Math.round((group_applications.length / people_num) * 100)}%</span>
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p>마감일 {end_date}까지</p>
        <h5 className="font-bold text-[24px] mt-1">{title}</h5>
        <p className="font-bold text-[24px] mt-3 mb-[4px]">{price.toLocaleString()}원</p>
        <p className="mb-[20px]">{item}</p>
        {is_finished ? (
          <button className="w-[330px] py-3 text-white font-bold text-[20px] bg-[#B3B3B3] rounded-full">
            이미 종료된 공구입니다 :&#40;
          </button>
        ) : (
          <>
            <GroupDetailBtnList userId={user_id} id={id} />
          </>
        )}
        {/* 보더 */}
        <div className="mt-[56px] border-t border-black py-6 px-2">
<<<<<<< HEAD
          <GroupContent content={content} />
=======
          {content}
>>>>>>> a167794e37632b20843a020a0e9cb394e69fbf47
        </div>
        <GroupEditBtnList userId={user_id} id={id} />
      </div>
    </div>
  );
}

export default GroupDetail;
