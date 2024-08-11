"use client";

import { editMyGroupApply } from "@/apis/mypage";
import { GroupApplication } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
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
      <td className="md:p-2 text-gray-3 md:text-black">{idx + 1}</td>
      <td className="md:p-2">{groupApply.user_name}</td>
      <td className="md:p-2">{groupApply.user_phone}</td>
      <td className="md:p-2">
        {groupApply.user_address} {groupApply.user_detail_address}
      </td>
      <td className="md:p-2 h-[44px] text-center flex justify-center items-center">
        <div onClick={paidGroupApplyHandler} className="w-6 h-6 cursor-pointer">
          {isPaid ? (
            <Image
              src="/img/icon-checkbox-checked.png"
              alt="체크된 체크박스"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src="/img/icon-checkbox.png"
              alt="체크 전 체크박스"
              width={24}
              height={24}
            />
          )}
        </div>
      </td>
    </>
  );
}

export default MyGroupApply;
