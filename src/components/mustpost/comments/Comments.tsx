import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

function Comments({ postId, userId }: { postId: string; userId: string }) {
  return (
    <div className="w-[680px] py-[13px] px-[23px] bg-gray-6 rounded-[8px]">
      <CommentsList postId={postId} />
      <CommentForm postId={postId} userId={userId} />
    </div>
  );
}

export default Comments;
