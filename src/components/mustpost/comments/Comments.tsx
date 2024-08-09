import React from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

function Comments({ postId }: { postId: string }) {
  return (
    <div className="w-[680px] py-[13px] px-[23px] bg-gray-6 rounded-[8px]">
      <CommentsList postId={postId} />
      <CommentForm postId={postId} />
    </div>
  );
}

export default Comments;
