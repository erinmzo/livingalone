"use client";
import { deleteMustPost } from "@/apis/mustpost";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";
import React from "react";

function MustDeleteBtn({ id }: { id: string }) {
  const router = useRouter();
  const { mutate: deletePost } = useMutation({
    mutationFn: (id: string) => deleteMustPost(id),
    onSuccess: () => {
      // router.back();
      router.push("/mustpost");
    },
  });

  const MustPostDeleteBtn = () => {
    Confirm.show(
      "혼자살때",
      "정말로 삭제하시겠습니까?",
      "네",
      "아니오",
      () => {
        deletePost(id);
      },
      () => {
        return;
      }
    );
  };
  return (
    <button
      className="w-[120px] py-[9px] border border-black rounded-full text-xl font-medium"
      onClick={MustPostDeleteBtn}
    >
      삭제
    </button>
  );
}

export default MustDeleteBtn;
