"use client";

import { getGroupPost, updateGroupPost } from "@/apis/grouppost";
import { GroupPost, TNewGroupPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Confirm } from "notiflix";
import SkeletonGroupFinishBtn from "./SkeletonGroupFinishBtn";

function GroupFinishBtn({ id }: { id: string }) {
  const {
    data: groupPost,
    isPending,
    isError,
  } = useQuery<GroupPost>({
    queryKey: ["finishGroupPost", id],
    queryFn: () => getGroupPost(id),
  });

  const updateMutation = useMutation({
    mutationFn: async (finishGroupPost: TNewGroupPost) => {
      await updateGroupPost(finishGroupPost);
    },
    onSuccess: async () => {
      postRevalidate(`/grouppost/read/${id}`);
    },
  });

  if (isPending) return <SkeletonGroupFinishBtn />;

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;

  const finishGroupPostHandler = async () => {
    const finishGroupPost: TNewGroupPost = {
      id: groupPost.id,
      user_id: groupPost.user_id,
      title: groupPost.title,
      start_date: groupPost.start_date,
      end_date: groupPost.end_date,
      people_num: groupPost.people_num,
      price: groupPost.price,
      content: groupPost.content,
      item: groupPost.item,
      link: groupPost.link,
      img_url: groupPost.img_url,
      is_finished: true,
    };
    if (groupPost) {
      Confirm.show(
        "혼자살때",
        "정말로 종료하시겠습니까?",
        "네",
        "아니오",
        () => {
          updateMutation.mutate(finishGroupPost);
        },
        () => {
          return;
        }
      );
    }
  };

  return (
    <button
      onClick={finishGroupPostHandler}
      className="w-full md:w-[300px] py-[9px] font-bold text-[20px] border text-main-8 border-main-8 box-border rounded-full"
    >
      공구 종료하기
    </button>
  );
}

export default GroupFinishBtn;
