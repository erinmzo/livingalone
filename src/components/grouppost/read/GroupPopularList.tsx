"use client";

import { getGroupPostOnMain, getGroupPostsOnDetail } from "@/apis/grouppost";
import { GroupApplication, GroupLike, GroupPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import GroupPostCard from "../list/GroupPostCard";

type TGroupApplication = Pick<GroupApplication, "id">;
type TGroupLike = Pick<GroupLike, "id">;
type TGroupApplicationsLikes = {
  group_applications: TGroupApplication[];
  group_likes: TGroupLike[];
};

type TPopularGroupPost = Pick<
  GroupPost,
  | "id"
  | "title"
  | "price"
  | "people_num"
  | "is_finished"
  | "img_url"
  | "start_date"
  | "end_date"
> &
  TGroupApplicationsLikes;

function GroupPopularList({ id }: { id: string }) {
  const {
    data: groupPosts,
    isPending,
    isError,
  } = useQuery<TPopularGroupPost[]>({
    queryKey: ["popularGroupPosts"],
    queryFn: getGroupPostsOnDetail,
  });
  if (isPending)
    return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;

  // a,b 타입 설정
  const sortedGroupPosts = groupPosts
    .filter((groupPost) => {
      console.log(groupPost.id, id);
      return groupPost.id !== id;
    })
    .sort((a: TPopularGroupPost, b: TPopularGroupPost) => {
      return b.group_likes.length - a.group_likes.length;
    })
    .slice(0, 2);

  return (
    <>
      <h6>인기 공구템</h6>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-[16px] lg:px-0">
        {sortedGroupPosts.map((post) => {
          return (
            <li key={post.id}>
              <GroupPostCard
                postId={post.id}
                application={post.group_applications}
                title={post.title}
                price={post.price}
                peopleNum={post.people_num}
                isFinished={post.is_finished}
                imgUrl={post.img_url}
                startDate={post.start_date}
                endDate={post.end_date}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default GroupPopularList;