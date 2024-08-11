"use client";

import { applyItems } from "@/apis/mypage";

import { GroupApplyItems } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import ApplyItemsCard from "./ApplyItemsCard";

import SkeletonApplyItemsCard from "./SkeletonApplyItems";
import EmptyState from "./EmptyState";

function ApplyItems() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: applyPosts = [],
    isPending,
    isError,
  } = useQuery<GroupApplyItems[]>({
    queryKey: ["apply", userId],
    queryFn: () => applyItems(userId),
  });

  if (isPending) return <SkeletonApplyItemsCard />;

  return (
    user && (
      <div className="flex flex-col justify-center items-center md:block">
        <div className="flex items-center justify-center md:block">
          <div
            className=" font-bold text-[12px] flex items-center justify-center border border-main-8 rounded-full w-[76px] h-[30px] text-main-8 
          md:border-none md:rounded-none md:text-left md:text-black md:text-[24px] md:w-[115px] md:h-[29px] md:block "
          >
            신청한 공구
          </div>
        </div>
        <div className="mt-8">
          {applyPosts.length ? (
            <ul className="grid grid-cols-1 gap-8">
              {applyPosts.map((apply) => (
                <ApplyItemsCard key={apply.id} apply={apply} />
              ))}
            </ul>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    )
  );
}

export default ApplyItems;
