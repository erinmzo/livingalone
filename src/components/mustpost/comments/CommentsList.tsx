"use client";
import { getComments } from "@/apis/mustpost";
import { MustComments } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import CommentDeleteBtn from "./CommentDeleteBtn";
import { useAuthStore } from "@/zustand/authStore";

function CommentsList({ postId }: { postId: string }) {
  const [editComment, setEditComment] = useState(false);
  const user = useAuthStore((state) => state.user);
  const {
    data: comments = [],
    isPending,
    isError,
  } = useQuery<MustComments[]>({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
  // console.log(comments);

  const handleEditComment = () => {
    setEditComment(true);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/img/loading-spinner.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    );
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            {user?.id === comment.user_id ? (
              // 댓글 작성자와 아이디가 같은 유저일 경우
              // 수정 모드
              // 읽기 모드
              <div>
                <Image
                  src={comment.profiles.profile_image_url}
                  alt="유저 프로필 사진"
                  width={50}
                  height={50}
                />
                <div>
                  <div>
                    <span>{comment.profiles.nickname}</span>
                    <span>
                      {comment.created_at.split("T").join(" ").substring(0, 16)}
                    </span>
                  </div>
                  <div>
                    <span>{comment.content}</span>
                  </div>
                  <button onClick={handleEditComment}>수정하기</button>
                  <CommentDeleteBtn commentId={comment.id} postId={postId} />
                </div>
              </div>
            ) : (
              // 댓글 작성자와 아이디가 다른 유저일 경우
              <div>
                <Image
                  src={comment.profiles.profile_image_url}
                  alt="유저 프로필 사진"
                  width={50}
                  height={50}
                />
                <div>
                  <div>
                    <span>{comment.profiles.nickname}</span>
                    <span>
                      {comment.created_at.split("T").join(" ").substring(0, 16)}
                    </span>
                  </div>
                  <div>
                    <span>{comment.content}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default CommentsList;
