"use client";
import { insertComment } from "@/apis/mustpost";
// import { TComment } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useState } from "react";

export type TComment = {
  post_id: string;
  user_id: string;
  created_at: string | Date;
  content: string;
};

function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: TComment) => insertComment(newComment),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const setContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

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
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <textarea
          value={content}
          onChange={(e) => setContentHandler(e)}
          className="border border-black whitespace-pre-wrap break-words"
        ></textarea>
        <button>등록하기</button>
      </form>
    </div>
  );
}

export default CommentForm;
