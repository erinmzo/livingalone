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
    <div>
      {/* 전체 wrap */}

      <div>
        {/* 상단부분 묶기 */}
        <Title title={title} postId={postId} />
        <UserInfo profile_image_url={profile_image_url} nickname={nickname} created_at={created_at} />
        <PostImage img_url={img_url} />
      </div>

      <div>
        {/* 포스팅부분 */}
        <ItemInfo item={item} location={location} price={price} name={name} />
        <div>{/* 라인 넣기 이것도 div로 해야하나? 구분선 뭘로 하더라 */}</div>
        <Contents content={content} />
      </div>
    </div>
  );
}

export default ReadPost;
