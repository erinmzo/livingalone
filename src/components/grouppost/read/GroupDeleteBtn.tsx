"use client";

import { deleteGroupPost } from "@/apis/grouppost";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

function GroupDeleteBtn({ id }: { id: string }) {
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteGroupPost(id);
    },
    onSuccess: () => {
      router.push("/grouppost");
    },
  });

  const deleteGroupPostHandler = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <button
      className="w-[120px] border border-black text-[20px] rounded-full"
      onClick={deleteGroupPostHandler}
    >
      삭제
    </button>
  );
}

export default GroupDeleteBtn;
