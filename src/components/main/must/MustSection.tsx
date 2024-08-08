"use client";
import { getMustPostOnMain } from "@/apis/mustpost";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { TMainMustPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import MainSectionTitle from "../common/MainSectionTitle";

function MustSection() {
  const {
    data: mustPosts = [],
    isPending,
    isError,
  } = useQuery<TMainMustPost[]>({
    queryKey: ["mustPost"],
    queryFn: getMustPostOnMain,
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

  if (isError) return <div className="flex justify-center items-center">에러...</div>;

  return (
    <div className="container mx-auto max-w-[1024px] pt-[58px] pb-[153px]">
      <MainSectionTitle
        title="구해줘 자취템"
        content="자취에 필요한 다양한 아이템을 자랑하고 추천해보세요"
        link="/mustpost"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-[16px] lg:px-0">
        {mustPosts.map((post) => (
          <li key={post.id}>
            <MustPostCard title={post.title} item={post.item} imgUrl={post.img_url} postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MustSection;
