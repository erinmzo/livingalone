import { deleteMustComment } from "@/apis/mustpost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Confirm } from "notiflix";
import React from "react";

function CommentDeleteBtn({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId: string) => deleteMustComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
  });

  const HandleCommentDelete = (commentId: string) => {
    Confirm.show(
      "혼자살때",
      "선택한 댓글을 삭제하시겠습니까?",
      "삭제",
      "취소",
      () => {
        deleteComment(commentId);
      },
      () => {
        return;
      }
    );
  };
  return (
    <button
      className="w-[34px] py-[3px] border text-gray-3 bg-gray-6 rounded-[4px]"
      onClick={() => HandleCommentDelete(commentId)}
    >
      삭제
    </button>
  );
}

export default CommentDeleteBtn;
