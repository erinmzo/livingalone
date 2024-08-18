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
  const [countComment, setCountComment] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const setContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCountComment(e.target.value.length);
  };

  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: TComment) => insertComment(newComment),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setLoading(false);
    },

    onError: () => {
      setLoading(false);
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

    setLoading(true);

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
    <div className="flex flex-col">
      <div className="md:w-[634px] mt-6 bg-gray-1 border border-gray-4 rounded-[8px]">
        <form onSubmit={submitHandler} className=" flex flex-col relative">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center z-50">
              <Image
                src="/img/loading-spinner-transparent.svg"
                alt="로딩중"
                width={80}
                height={80}
              />
            </div>
          )}
          <textarea
            value={content}
            placeholder="커뮤니티가 더 훈훈해지는 댓글 부탁드립니다."
            cols={28}
            rows={2}
            maxLength={500}
            autoFocus={false}
            onChange={(e) => {
              setContentHandler(e);
            }}
            className="flex-grow py-[15px] pl-[17px] pr-[50px] md:pl-[15px] md:pr-[49px] md:py-[15px] text-[16px] rounded-[8px] resize-none outline-none"
          ></textarea>
          <button className="absolute right-0 bottom-0 w-[34px] mb-[15px] mr-[15px] md:mb-[15px] py-[3px] px-[5px] border border-gray-3 text-[12px] text-gray-3 rounded-[4px] z-10">
            등록
          </button>
        </form>
      </div>
      <span className="text-gray-3 text-[12px] ml-auto mr-1 mt-1">
        {countComment} / 500자
      </span>
    </div>
  );
}

export default CommentForm;
