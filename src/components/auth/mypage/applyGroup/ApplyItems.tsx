"use client";

import { applyItems } from "@/apis/mypage";

import { GroupApplyItems } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import ApplyItemsCard from "./ApplyItemsCard";
import EmptyState from "./EmptyState";
import SkeletonApplyItemsCard from "./SkeletonApplyItems";

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
      <div>
        <div className="text-[24px] font-bold ml-1">신청한 공구</div>
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
