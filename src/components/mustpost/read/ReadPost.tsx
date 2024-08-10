import ShareButton from "@/components/common/share/ShareButton";
import Contents from "./readpost/Contents";
import ItemInfo from "./readpost/ItemInfo";
import PostImage from "./readpost/PostImage";
import Title from "./readpost/Title";
import UserInfo from "./readpost/UserInfo";
interface ReadPostProps {
  created_at: string;
  title: string;
  content: string;
  item: string;
  price: number;
  location: string;
  img_url: string;
  nickname: string;
  profile_image_url: string;
  name: string;
  postId: string;
}
function ReadPost({
  created_at,
  title,
  content,
  item,
  price,
  location,
  img_url,
  nickname,
  profile_image_url,
  name,
  postId,
}: ReadPostProps) {
  return (
    <div className="mt-6 md:mt-0">
      <Title title={title} postId={postId} />
      <UserInfo
        profile_image_url={profile_image_url}
        nickname={nickname}
        created_at={created_at}
        postId={postId}
      />
      <PostImage img_url={img_url} />
      <div className="flex md:hidden flex-row justify-between border-b md:border-b-0 border-gray-2 ">
        <ItemInfo item={item} location={location} price={price} name={name} />
        <div className="pt-[44px] md:pt-0 pr-2 md:pl-2 md:pr-0 md:pb-4 md:border-b-[1px] md:border-gray-2">
          <ShareButton
            postId={postId}
            title={title}
            content={item}
            imgUrl={img_url}
          />
        </div>
      </div>

      <Contents content={content} />
    </div>
  );
}

export default ReadPost;
