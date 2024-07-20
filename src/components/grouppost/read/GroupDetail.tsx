import InnerLayout from "@/components/common/Page/InnerLayout";
import { createClient } from "@/supabase/server";
import { GroupPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GroupDeleteBtn from "./GroupDeleteBtn";

type Props = {
  params: { id: string };
};

type TGroupPostDetail = {
  profiles: {
    nickname: string;
    profile_image_url: string;
  };
} & GroupPost;

async function GroupDetail({ params }: Props) {
  const { id } = params;
  const supabase = createClient();
  const { data } = await supabase
    .from("group_posts")
    .select("*, profiles(nickname, profile_image_url)")
    .eq("id", id)
    .single();

  if (!data) {
    return <div>로딩 중입니다.</div>;
  }
  console.log(data);
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
    profiles: { nickname, profile_image_url },
  } = data as TGroupPostDetail;

  return (
    <InnerLayout>
      <div>
        <Image src={img_url} alt="공구템 이미지" width={680} height={500} />
        <div>999(하트수)</div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <Image
            src={profile_image_url}
            alt="프로필 사진"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p>{nickname}</p>
            <p>{start_date}</p>
          </div>
        </div>
        <div className="flex">
          <p>달성률</p>
          {/* 이걸 하려면 신청 받은 갯수도 가져와야한다... */}
          <p>80%</p>
        </div>
      </div>
      <div>
        <p>마감일 {end_date}까지</p>
        <h5>{title}</h5>
        <p>{price.toLocaleString()}원</p>
        {/* 글 작성자는 수정삭제, 그 외엔 공구 신청 */}
        <button>공구 신청하기</button>
        <div>
          <Link href={`/grouppost/edit/${id}`}>
            <button>글 수정</button>
          </Link>
          <GroupDeleteBtn id={id} />
        </div>
        {/* 보더 */}
        <div>
          <p>{content}</p>
        </div>
      </div>
    </InnerLayout>
  );
}

export default GroupDetail;
