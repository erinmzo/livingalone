"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyGroupPosts } from "@/apis/mypage";
import { useAuthStore } from "@/zustand/authStore";
import MyGroupPost from "./MyGroupPost";
import { GroupApplication, GroupPost, TMyGroupPost } from "@/types/types";

function MyGroup() {
  const user = useAuthStore((state) => state.user);

  // TODO useQuery 타입 지정해주기
  const {
    data: groupPosts,
    isPending,
    isError,
    refetch,
  } = useQuery<TMyGroupPost[]>({
    queryKey: ["myGroupPosts", user?.id],
    queryFn: () => {
      if (!user || !user.id) throw new Error("User not found");
      return getMyGroupPosts(user.id);
    },
    enabled: !!user?.id,
  });

  if (isPending)
    return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;
  return (
    <div className="flex-col">
      <h5 className="font-bold text-[24px] mb-[32px] w-full">나의 정보</h5>
      {groupPosts.length ? (
        groupPosts?.map((groupPost: TMyGroupPost) => {
          return (
            <div key={groupPost.id}>
              <MyGroupPost groupPost={groupPost} refetch={refetch} />
            </div>
          );
        })
      ) : (
        <div>등록된 공구템이 없습니다.</div>
      )}
    </div>
  );
}

export default MyGroup;
