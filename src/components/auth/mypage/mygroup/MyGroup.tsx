"use client";

import { getMyGroupPosts } from "@/apis/mypage";
import { TMyGroupPost } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import MyGroupPost from "./MyGroupPost";

function MyGroup() {
  const user = useAuthStore((state) => state.user);

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
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

  if (isError) return <div className="flex justify-center items-center">에러...</div>;
  return (
    <div className="flex-col">
      <h5 className="font-bold text-[24px] mb-[32px] w-full">나의 정보</h5>
      {groupPosts.length > 0 ? (
        <div className="border-t border-gray-2">
          {groupPosts.map((groupPost: TMyGroupPost) => {
            return (
              <div key={groupPost.id}>
                <MyGroupPost groupPost={groupPost} refetch={refetch} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col py-[100px] justify-center items-center">
          <Image src="/img/icon-empty.png" alt="empty" width={100} height={0} className="mb-5" />
          <div className="flex justify-center items-center text-gray-4">등록한 공구템이 없습니다</div>
        </div>
      )}
    </div>
  );
}

export default MyGroup;
