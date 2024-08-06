import { getGroupDetail } from "@/apis/grouppost";
import ChatForm from "@/components/chat/ChatForm";
import Like from "@/components/common/Like";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { GroupPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "../../common/share/ShareButton";
import GroupContent from "./GroupContent";
import GroupDetailBtnList from "./GroupDetailBtnList";
import GroupEditBtnList from "./GroupEditBtnList";
import GroupPopularList from "./GroupPopularList";

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
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/img/loading-spinner.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    );
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

  const achievementRate = Math.round(
    (group_applications.length / people_num) * 100
  );

  return (
    <>
      <InnerLayout>
        <div className={`${is_finished ? "text-gray-3" : ""}`}>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={img_url}
              alt="공구템 이미지"
              width={680}
              height={500}
              className="border rounded-lg"
              priority
            />
            {link && (
              <a href={link} target="_blank">
                <div className=" cursor-pointer flex justify-center items-center bg-black absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 hover:bg-opacity-50">
                  <p className="z-10 opacity-100 text-white">공구템 보러가기</p>
                  <Image
                    src="/img/icon-up-right.png"
                    alt="보러가기 버튼"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
              </a>
            )}

            <div className="absolute bottom-5 left-5">
              <Like postId={id} />
            </div>
          </div>
          <div className="flex justify-between mt-[23px]">
            <div className="flex gap-2 items-center">
              <Image
                src={profile_image_url}
                alt="프로필 사진"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p>{nickname}</p>
                <p className="text-gray-3 text-[14px]">{start_date}</p>
              </div>
            </div>
            <div className="flex">
              <p
                className={`text-[20px] ${
                  is_finished ? "text-gray-2" : "text-red-3"
                }`}
              >
                달성률{" "}
                <span className="font-bold text-[36px]">
                  {achievementRate}%
                </span>
              </p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-gray-3">마감일 {end_date} 까지</p>
            <h5 className="font-bold text-[28px] mt-1">{title}</h5>
            <p
              className={`font-bold text-[24px] mt-3 mb-[4px]  ${
                is_finished ? "text-gray-3" : "text-black"
              }`}
            >
              {price.toLocaleString()}원
            </p>
            <p className="mb-[20px] font-bold text-gray-3">{item}</p>
            <div className="flex gap-2">
              {is_finished ? (
                <div className="w-[330px] py-3 font-bold text-gray-4 text-[20px] bg-gray-2 rounded-full text-center">
                  종료된 공구템입니다.
                </div>
              ) : (
                <>
                  <GroupDetailBtnList
                    userId={user_id}
                    id={id}
                    achievementRate={achievementRate}
                  />
                </>
              )}
              {/* 임시 공유 버튼 */}
              <ShareButton
                postId={data.id}
                title={title}
                content={item}
                imgUrl={img_url}
              />
            </div>
            <div className="mt-[56px] border-y border-gray-2 py-6 px-2 mb-[64px]">
              <GroupContent content={content} />
            </div>

            {is_finished ? "" : <ChatForm postId={id} userId={user_id} />}
            <GroupEditBtnList userId={user_id} id={id} />
          </div>
        </div>
      </InnerLayout>
      <GroupPopularList id={id} />
      <div className="flex justify-center mt-[69px]">
        <Link href={"/grouppost"}>
          <button className="border-gray-4 border-[1px] rounded-full text-gray-4 font-bold py-[8.5px] flex items-center pl-[10px] pr-[18px]">
            <Image
              src="/img/icon-back.png"
              alt="돌아가기 버튼"
              width={24}
              height={24}
            />
            목록으로 돌아가기
          </button>
        </Link>
      </div>
    </>
  );
}

export default GroupDetail;
