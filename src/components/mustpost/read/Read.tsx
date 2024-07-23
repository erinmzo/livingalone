import InnerLayout from "@/components/common/Page/InnerLayout";
import React from "react";
import ReadPost from "./ReadPost";
import ReadTopBtn from "./ReadTopBtn";
import TopList from "./TopList";
import { getMustPostDetail } from "@/apis/mustpost";
import { MustCategory, MustPost } from "@/types/types";

type Props = {
  params: { id: string };
};

type TMustPostDetail = {
  profiles: {
    nickname: string;
    profile_image_url: string;
  };
  must_categories: {
    name: string;
  };
} & MustPost;

async function Read({ params }: Props) {
  const { id } = params;
  const data = await getMustPostDetail(id);
  if (!data) {
    return <div>로딩중 ･･･</div>;
  }
  const {
    created_at,
    title,
    content,
    item,
    price,
    location,
    img_url,
    profiles: { nickname, profile_image_url },
    must_categories: { name },
  } = data as TMustPostDetail;

  return (
    <InnerLayout>
      <ReadPost
        created_at={created_at}
        title={title}
        content={content}
        item={item}
        price={price}
        location={location}
        img_url={img_url}
        nickname={nickname}
        profile_image_url={profile_image_url}
        name={name}
      />
      <ReadTopBtn />
      <TopList />
    </InnerLayout>
  );
}

export default Read;
