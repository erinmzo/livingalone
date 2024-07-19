"use client";

import { getGroupPostOnMain } from "@/apis/grouppost";
import GroupPostCard from "@/components/grouppost/list/GroupPostCard";
import { GroupPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import MainSectionTitle from "../common/MainSectionTitle";

type TMainGroupPost = Pick<
  GroupPost,
  "id" | "title" | "price" | "people_num" | "is_finished" | "img_url" | "start_date" | "end_date"
>;

function GroupSection() {
  const {
    data: groupPosts,
    isPending,
    isError,
  } = useQuery<TMainGroupPost[]>({
    queryKey: ["groupPost"],
    queryFn: getGroupPostOnMain,
  });

  if (isPending) return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError) return <div className="flex justify-center items-center">에러...</div>;

  return (
    <div className="container mx-auto max-w-[1024px] pt-[58px] pb-[153px]">
      <MainSectionTitle
        title="같이 사 공구템"
        content="공동구매를 통해 자취에 필요한 물품을 저렴한 금액에 구매해보세요"
        link="/grouppost"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groupPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/grouppost/read/${post.id}`}>
              <GroupPostCard
                title={post.title}
                price={post.price}
                peopleNum={post.people_num}
                isFinished={post.is_finished}
                imgUrl={post.img_url}
                startDate={post.start_date}
                endDate={post.end_date}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupSection;
