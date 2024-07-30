import { getMustPostDetail } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { MustPost } from "@/types/types";
import ReadPost from "./ReadPost";
import MorePost from "./MorePost";
import MustPostAction from "./MustPostAction";
import MustTopBtn from "../TopButton/MustTopBtn";
import Link from "next/link";
import Image from "next/image";

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
    user_id,
    created_at,
    title,
    content,
    item,
    price,
    category_id,
    location,
    img_url,
    profiles: { nickname, profile_image_url },
    must_categories: { name },
  } = data as TMustPostDetail;

  return (
    <>
      <InnerLayout>
        <div className="flex flex-col justify-center items-center">
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
            postId={id}
          />
          <MustPostAction id={id} userId={user_id} />
        </div>
      </InnerLayout>
      <MorePost category_id={category_id} category_name={name} id={id} />
      <div className="flex flex-col justify-center items-center">
        <Link
          href={`/mustpost`}
          className="inline-flex flex-row mt-[69px] px-[18px] py-[9px] border border-gray-4 rounded-full font-bold text-[16px] text-gray-4"
        >
          <Image
            src="/img/icon-left.svg"
            alt="목록으로 돌아가기 아이콘"
            width={7}
            height={12}
            className="mr-[9px]"
          />
          목록으로 돌아가기
        </Link>
      </div>
    </>
  );
}

export default Read;
