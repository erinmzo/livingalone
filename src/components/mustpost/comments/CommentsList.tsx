"use client";
import { getComments, updatenewComment } from "@/apis/mustpost";
import { MustComments } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import CommentDeleteBtn from "./CommentDeleteBtn";
import { useAuthStore } from "@/zustand/authStore";
import { Notify } from "notiflix";
import { useRouter } from "next/navigation";

export type TEditComment = {
  commentId: string | null;
  content: string;
};

function CommentsList({ postId }: { postId: string }) {
  const [editComment, setEditComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [page, setPage] = useState(1);

  const {
    data: commentsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["comments", postId, page],
    queryFn: () => getComments(postId, page),
  });
  const comments = commentsData?.data || [];
  const totalComments = commentsData?.count || 0;
  const totalPages = Math.ceil(totalComments / commentsData?.limit);

  const { mutate: updateComment } = useMutation({
    mutationFn: (newEditComment: TEditComment) =>
      updatenewComment(newEditComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleEditComment = (commentId: string, content: string) => {
    setEditCommentId(commentId);
    setEditComment(content);
  };

  const handleUpdateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editComment.trim()) {
      Notify.warning("댓글을 입력해주세요");
      return;
    }
    if (!user) {
      Notify.failure("로그인을 먼저 진행해주세요.");
      router.push("/login");
      return;
    }
    const newEditComment: TEditComment = {
      commentId: editCommentId,
      content: editComment,
    };

    updateComment(newEditComment);
    setEditCommentId(null);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/img/loading-spinner-transparent.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-[23px] pb-[16px]">
        <div className="relative w-[67px] md:w-[100px] h-[62px] md:h-[94px] mb-5">
          <Image
            src="/img/icon-empty.png"
            alt="empty"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className="text-gray-2 text-[16px] mb-1">댓글이 없습니다.</span>
        <span className="text-gray-2 text-[16px]">
          첫 댓글을 작성해 보세요!
        </span>
      </div>
    );
  }

  return (
    <div>
      {comments &&
        comments.map((comment: any) => (
          <div key={comment.id}>
            {user?.id === comment.user_id ? (
              // 댓글 작성자와 아이디가 같은 유저일 경우
              // 수정 모드
              <div>
                {editCommentId === comment.id ? (
                  <div className="pr-1 w-4 h-4">
                    <Image
                      src={comment.profiles.profile_image_url}
                      alt="유저 프로필 사진"
                      width={16}
                      height={16}
                    />
                    <form onSubmit={handleUpdateComment}>
                      <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                      ></textarea>
                      <button type="submit">완료</button>
                      <button type="button" onClick={handleCancelEdit}>
                        취소
                      </button>
                    </form>
                  </div>
                ) : (
                  // 읽기 모드
                  <div className="flex flex-row px-2 py-2 border-b border-gray-2">
                    <div className="mr-1 w-4 h-4 flex-shrink-0">
                      <Image
                        src={comment.profiles.profile_image_url}
                        alt="유저 프로필 사진"
                        width={16}
                        height={16}
                        className="w-4 h-4 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex flex-col py-[2px]">
                        <span className="pb-1 text-gray-4 text-[10px]">
                          {comment.profiles.nickname}
                        </span>
                        <span className="pb-[2px] text-gray-4 text-xs whitespace-pre-wrap break-words">
                          {comment.content}
                        </span>
                        <span className="text-gray-2 text-[10px]">
                          {comment.created_at
                            .split("T")
                            .join(" ")
                            .substring(0, 16)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-gray-4 text-xs"
                          onClick={() =>
                            handleEditComment(comment.id, comment.content)
                          }
                        >
                          수정
                        </button>
                        <CommentDeleteBtn
                          commentId={comment.id}
                          postId={postId}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 댓글 작성자와 아이디가 다른 유저일 경우
              <div className="flex flex-row px-2 py-2 border-b border-gray-2">
                <div className="relative mr-1 w-4 h-4 flex-shrink-0">
                  <Image
                    src={comment.profiles.profile_image_url}
                    alt="유저 프로필 사진"
                    fill
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>

                <div className="flex flex-col py-[2px]">
                  <span className="pb-1 text-gray-4 text-[10px]">
                    {comment.profiles.nickname}
                  </span>
                  <span className="pb-[2px] text-gray-4 text-xs whitespace-pre-wrap break-words">
                    {comment.content}
                  </span>
                  <span className="text-gray-2 text-[10px]">
                    {comment.created_at.split("T").join(" ").substring(0, 16)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      <div className="flex justify-center mt-[14px] gap-2">
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              className={`w-4 h-4 border-[0.5px] border-gray-2 flex justify-center items-center text-[10px]
              ${page === index + 1 ? "text-main-8" : "text-gray-2"}`}
              key={index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CommentsList;
