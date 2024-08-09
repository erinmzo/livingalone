import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

function Comments({ postId, userId }: { postId: string; userId: string }) {
  return (
    <div>
      <CommentsList postId={postId} />
      <CommentForm postId={postId} userId={userId} />
    </div>
  );
}

export default Comments;
