import { NewMustCategoryPost } from "@/apis/mustpost";
import MustPostCard from "../list/MustPostCard";

interface MorePostProps {
  category_id: string;
  category_name: string;
  id: string;
}

async function MorePost({ category_id: postCategoryId, category_name, id: postId }: MorePostProps) {
  const latestPosts = await NewMustCategoryPost(postCategoryId, postId);

  if (!latestPosts?.length) {
    return (
      <div className="flex flex-col justify-center items-center mt-[132px]">
        <h3 className="pb-6 font-bold text-2xl">{category_name} 최신 게시글</h3>
        <div>해당 카테고리에 맞는 최신 게시글이 없습니다 🥹</div>
      </div>
    );
  }

  return (
    <div className="mt-[190px]">
      <h3 className="mb-6 font-bold text-[26px] text-black">{category_name} 관련 추천템</h3>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-[32px]">
          {latestPosts.map((post) => (
            <li key={post.id} className="mb-[64px]">
              <MustPostCard postId={post.id} title={post.title} item={post.item} imgUrl={post.img_url} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MorePost;
