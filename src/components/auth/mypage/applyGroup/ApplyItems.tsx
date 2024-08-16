"use client";

import { applyItems } from "@/apis/mypage";

import { GroupApplyItems } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import SkeletonApplyItemsCard from "./SkeletonApplyItems";

import ApplyItemsCard from "./ApplyItemsCard";
import EmptyState from "../EmptyState/EmptyState";

function ApplyItems() {
  const user = useAuthStore((state) => state.user);

  const { data: applyPosts = [], isPending } = useQuery<GroupApplyItems[]>({
    queryKey: ["apply", user?.id],
    queryFn: () => {
      if (!user || !user.id) throw new Error("User not found");
      return applyItems(user.id);
    },
    enabled: !!user,
  });

  if (isPending) return <SkeletonApplyItemsCard />;

  return (
    user && (
      <div className="flex flex-col justify-center items-center md:block">
        <div className="flex items-center justify-center md:block">
          <div
            className=" font-bold mt-8 md:mt-0 text-[12px] flex items-center justify-center border border-main-8 rounded-full w-[76px] h-[30px] text-main-8 
          md:border-none md:rounded-none md:text-left md:text-black md:text-[24px] md:w-[115px] md:h-[29px] md:block "
          >
            신청한 공구
          </div>
        </div>
        <div className="mt-8 w-full">
          {applyPosts.length ? (
            <ul className="grid grid-cols-1 gap-8 ">
              {applyPosts.map((apply) => (
                <ApplyItemsCard key={apply.id} apply={apply} />
              ))}
            </ul>
          ) : (
            <EmptyState
              message={
                <>
                  <p>아직 신청한 공구가 없습니다.</p>
                  <p>마음에 드는 공구가 있다면 신청해보세요!</p>
                </>
              }
            />
          )}
        </div>
      </div>
    )
  );
}

export default ApplyItems;
