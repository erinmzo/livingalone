"use client";

import { editMyGroupApply } from "@/apis/mypage";
import { GroupApplication } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MyGroupApply({
  groupApply,
  idx,
  refetch,
}: {
  groupApply: GroupApplication;
  idx: number;
  refetch: () => void;
}) {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsPaid(groupApply.is_paid);
  }, [groupApply.is_paid]);

  const queryClient = useQueryClient();
  const router = useRouter();

  const [isPaid, setIsPaid] = useState(groupApply.is_paid);

  const updateMutation = useMutation({
    mutationFn: async (newGroupApply: GroupApplication) => {
      await editMyGroupApply(groupApply.id, newGroupApply);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["myGroupPosts", user?.id],
      });
      await refetch();
    },
  });

  const paidGroupApplyHandler = async () => {
    const newGroupApply: GroupApplication = {
      ...groupApply,
      is_paid: !isPaid,
    };
    setIsPaid(!isPaid);
    updateMutation.mutate(newGroupApply);
  };

  return (
    <>
      <td className="p-2">{idx + 1}</td>
      <td className="p-2">{groupApply.user_name}</td>
      <td className="p-2">{groupApply.user_phone}</td>
      <td className="p-2">
        {groupApply.user_address} {groupApply.user_detail_address}
      </td>
      <td className="p-2 text-center">
        <div onClick={paidGroupApplyHandler} className="w-6 h-6 cursor-pointer">
          {isPaid ? (
            <div className="bg-red-1 w-full h-full"></div>
          ) : (
            <div className="bg-black w-full h-full"></div>
          )}
        </div>
      </td>
    </>
  );
}

export default MyGroupApply;
