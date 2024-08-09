"use client";
import { insertAlarm } from "@/apis/alarm";
import { insertComment } from "@/apis/mustpost";
<<<<<<< HEAD
=======
import { TAddAlarm } from "@/types/types";
>>>>>>> 317377e858084227f535dbae8dd7c44cc02a706a
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useState } from "react";

export type TComment = {
  post_id: string;
  user_id: string;
  created_at: string | Date;
  content: string;
};

function CommentForm({ postId, userId }: { postId: string; userId: string }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const setContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: TComment) => insertComment(newComment),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const { mutate: addAlarm } = useMutation({
    mutationFn: (chatAlarmData: TAddAlarm) => insertAlarm(chatAlarmData),
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      Notify.warning("댓글을 입력해주세요.");
      return;
    }
    if (!user) {
      Notify.failure("로그인을 먼저 진행해주세요.");
      router.push("/login");
      return;
    }

    // 한국 시간으로 넣기
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    const newComment = {
      post_id: postId,
      user_id: user.id,
      created_at: today,
      content,
    };

    addComment(newComment);
    setContent("");

    const chatAlarmData = {
      type: "comment",
      user_id: userId,
      group_post_id: postId,
      must_post_id: null,
      link: `/grouppost/read/${postId}`,
      is_read: false,
    };
    addAlarm(chatAlarmData);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="flex w-[635px] pt-4">
        <textarea
          value={content}
          placeholder="댓글 게시하기"
          onChange={(e) => setContentHandler(e)}
          className="flex-grow-1 border border-gray-4"
        ></textarea>
<<<<<<< HEAD
        <button className="flex-grow-0 w-8 aspect-square">
          <Image
            src="/img/icon-send.svg"
            alt="등록하기"
            width={32}
            height={32}
          />
=======
        <button className="">
          <Image src="/img/icon-send.svg" alt="등록하기" width={32} height={32} />
>>>>>>> 317377e858084227f535dbae8dd7c44cc02a706a
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
