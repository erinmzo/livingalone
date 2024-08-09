"use client";
import { useAuthStore } from "@/zustand/authStore";
import GroupApplyBtn from "./GroupApplyBtn";
import GroupFinishBtn from "./GroupFinishBtn";

function GroupDetailBtnList({
  userId,
  id,
  achievementRate,
}: {
  userId: string;
  id: string;
  achievementRate: number;
}) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {user && user.id === userId ? (
        <GroupFinishBtn id={id} />
      ) : (
        <GroupApplyBtn
          id={id}
          achievementRate={achievementRate}
          userId={userId}
        />
      )}
    </>
  );
}

export default GroupDetailBtnList;
