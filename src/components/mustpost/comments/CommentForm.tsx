"use client";
import { insertComment } from "@/apis/mustpost";
import { TComment } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useState } from "react";

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

  const setContentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      Notify.warning("댓글을 입력해주세요.");
      return;
    }
    if (!user) {
      router.push("/login");
      Notify.failure("로그인을 먼저 진행해주세요.");
      return;
    }
    const today = new Date();
    const newComment = {
      post_id: postId,
      user_id: user.id,
      content,
    };

    addComment(newComment);
    setContent("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={content}
          onChange={setContentHandler}
          className="border border-black"
        />
        <button>등록하기</button>
      </form>
    </div>
  );
}

export default CommentForm;
