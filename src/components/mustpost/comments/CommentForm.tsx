"use client";
import { insertAlarm } from "@/apis/alarm";
import { insertComment } from "@/apis/mustpost";
import { TAddAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Notify } from "notiflix";
import React, { useState } from "react";

export type TComment = {
  post_id: string;
  user_id: string;
  created_at: string | Date;
  content: string;
};

function CommentForm({ postId, userId }: { postId: string; userId: string }) {
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
    if (!user) {
      Notify.warning("로그인을 먼저 진행해주세요.");
      return;
    }

    if (!content.trim()) {
      Notify.warning("댓글을 입력해주세요.");
      return;
    }

    if (content.length > 500) {
      Notify.warning("500자 이내로 작성해주세요");
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
      group_post_id: null,
      must_post_id: postId,
      link: `/mustpost/read/${postId}`,
      is_read: false,
    };
    addAlarm(chatAlarmData);
  };

  return (
    <div className="md:w-[635px] pt-4 ">
      <form onSubmit={submitHandler} className="flex flex-row">
        <textarea
          value={content}
          placeholder="댓글 게시하기"
          cols={30}
          rows={2}
          maxLength={501}
          autoFocus={true}
          onChange={(e) => setContentHandler(e)}
          className="flex-grow px-4 py-[9px] border border-gray-4 text-sm rounded-[8px] resize-none outline-none"
        ></textarea>
        <button className="flex-grow-0 pl-1">
          <Image
            src="/img/icon-send.svg"
            alt="등록하기"
            width={32}
            height={32}
          />
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
