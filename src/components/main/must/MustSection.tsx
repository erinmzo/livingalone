"use client";
import { getMustPostOnMain } from "@/apis/mustpost";
import MustPostCard from "@/components/mustpost/list/MustPostCard";
import { TMainMustPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
    <div className="container mx-auto lg:max-w-[1024px] pt-[42px] pb-[132px] lg:pt-[58px] lg:pb-[153px]">
      <MainSectionTitle
        title="자랑해 자취템"
        content="자취에 필요한 다양한 아이템을 자랑하고 추천해보세요"
        link="/mustpost"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-[27px] lg:px-0">
        {mustPosts.map((post) => (
          <li key={post.id}>
            <MustPostCard title={post.title} item={post.item} imgUrl={post.img_url} postId={post.id} />
          </li>
        ))}
      </ul>
      <div className="md:hidden w-full flex justify-center mt-[40px]">
        <div className="border border-main-8 rounded-full w-[108px]">
          <Link
            className="block text-[16px] font-bold text-main-8 flex items-center py-[8px] px-[18px]"
            href="/mustpost/list"
          >
            전체보기
            <Image src="/img/icon-right.svg" alt="&gt;" width={7} height={12} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MustSection;
