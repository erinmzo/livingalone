import { useAuthStore } from "@/zustand/authStore";
import React from "react";

function CommentAction({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return null;
  }

  return <div>CommentAction</div>;
}

export default CommentAction;
