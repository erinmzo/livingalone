import React from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

function Comments({ postId }: { postId: string }) {
  console.log(postId);
  return (
    <div>
      <CommentsList postId={postId} />
      <CommentForm postId={postId} />
    </div>
  );
}

export default Comments;
