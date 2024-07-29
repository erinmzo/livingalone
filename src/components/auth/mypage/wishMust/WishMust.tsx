"use client";

import { wishItem } from "@/apis/mypage";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

function WishMust() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: wish = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["wish", userId],
    queryFn: () => wishItem(userId),
  });

  if (isPending) return <div>로딩 중..</div>;
  if (isError) return <div>에러.. </div>;

  return (
    user && (
      <div>
        <div className="text-[24px] font-bold">찜한 자취템</div>
        <div>
          <ul className="grid grid-cols-2 gap-[32px]">
            {wish.map((post: any) => (
              <li key={post.id} className="mb-[64px]">
                <MustPostCard
                  postId={post.post_id}
                  title={post.must_posts.title}
                  item={post.must_posts.item}
                  imgUrl={post.must_posts.img_url}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default WishMust;
