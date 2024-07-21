"use client";

import { getGroupPost, getGroupPostOnMain } from "@/apis/grouppost";
import { GroupPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import GroupPostCard from "./GroupPostCard";
import { useState } from "react";

type TMainGroupPost = Pick<
  GroupPost,
  | "id"
  | "title"
  | "price"
  | "people_num"
  | "is_finished"
  | "img_url"
  | "start_date"
  | "end_date"
>;

function PostList() {
  const [isFinished, SetIsFinished] = useState<boolean>(false);
  const {
    data: groupPosts,
    isPending,
    isError,
    refetch,
  } = useQuery<TMainGroupPost[]>({
    queryKey: ["groupPost", isFinished],
    queryFn: () => getGroupPost(isFinished),
  });

  const finishSort = () => {
    SetIsFinished(true);
    refetch();
  };

  if (isPending)
    return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;
  return (
    <div>
      <h5>같이 사 공구템</h5>
      <p>공동구매를 통해 자취에 필요한 물품을 저렴한 💰금액에 구매해보세요</p>
      <div>
        <button
          onClick={() => {
            SetIsFinished(false);
            refetch();
          }}
        >
          진행중
        </button>
        <button
          onClick={() => {
            SetIsFinished(true);
            refetch();
          }}
        >
          종료됨
        </button>
      </div>
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

export default PostList;
