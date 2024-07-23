import InnerLayout from "@/components/common/Page/InnerLayout";
import { createClient } from "@/supabase/server";
import { GroupPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GroupDeleteBtn from "./GroupDeleteBtn";
import GroupApplyBtn from "./GroupApplyBtn";
import { getGroupDetail } from "@/apis/grouppost";
import GroupFinishBtn from "./GroupFinishBtn";
// import { useRouter } from "next/navigation";

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
    profiles: { nickname, profile_image_url },
  } = data as TGroupPostDetail;
  return (
    <InnerLayout>
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={img_url}
          alt="공구템 이미지"
          width={680}
          height={500}
          className="border rounded-lg"
        />
        {link && (
          <Link href={link}>
            <div className=" cursor-pointer flex justify-center items-center bg-black absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 hover:bg-opacity-50">
              <p className="z-10 opacity-100 text-white">공구템 보러가기</p>
            </div>
          </Link>
        )}

        {/* <div>999(하트수)</div> */}
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
            <p className="text-[12px] text-[#757575]">{start_date}</p>
          </div>
        </div>
        <div className="flex">
          <p className="font-bold text-[20px]">
            달성률{" "}
            <span className="text-[36px]">
              {Math.round((group_applications.length / people_num) * 100)}%
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p>마감일 {end_date}까지</p>
        <h5 className="font-bold text-[24px] mt-1">{title}</h5>
        <p className="font-bold text-[24px] mt-3 mb-[35px]">
          {price.toLocaleString()}원
        </p>
        {/* TODO 글 작성자는 수정삭제, 그 외엔 공구 신청 */}

        {is_finished ? (
          <button>이미 종료된 공구입니다.</button>
        ) : (
          <>
            <GroupApplyBtn id={id} />
            <GroupFinishBtn id={id} />
          </>
        )}
        {/* 보더 */}
        <div className="mt-[56px] border-t border-black py-6 px-2">
          <pre>{content}</pre>
        </div>
        <div className="flex justify-center gap-2 mt-[14px]">
          <Link href={`/grouppost/edit/${id}`}>
            <button className="w-[197px] h-[48px] font-bold bg-black text-white text-[20px] rounded-full">
              글 수정
            </button>
          </Link>
          <GroupDeleteBtn id={id} />
        </div>
      </div>
    </InnerLayout>
  );
}

export default GroupDetail;
