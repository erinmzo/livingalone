// import Wish from "@/components/common/Wish";
// import Link from "next/link";
import { NewMustCategoryPost } from "@/apis/mustpost";
import Image from "next/image";
import React from "react";

interface MorePostProps {
  category_id: string;
  category_name: string;
}

async function MorePost({
  category_id: postCategoryId,
  category_name,
}: MorePostProps) {
  const data = await NewMustCategoryPost(postCategoryId);
  if (!data) {
    return <div>로딩중 ･･･</div>;
  }

  return (
    <div>
      <h3 className="pb-6 font-bold text-2xl">{category_name} 최신 게시글</h3>
      <div>
        <ul className="flex flex-row gap-8">
          {data.map((newPost) => (
            <li key={newPost.id}>
              <div className="pt-4">
                <Image
                  src={newPost.img_url}
                  alt={newPost.item}
                  width={320}
                  height={320}
                />
                {/* <div className="w-[320px] h-[320px] bg-black"></div> */}
                <div className="pl-1">
                  <span className="text-[14px] text-[#808080] truncate">
                    {newPost.item}
                  </span>
                  <h4 className="text-[20px] font-bold truncate">
                    {newPost.title}
                  </h4>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 제일 상단의 div에 크기를 정해놓지 않았고, li가 아직 한개여서 가운데에 있는 것 처럼 보이긴 하는데
// 기본적으로 3개씩 들어갈꺼라 그렇게 되면 와이어프레임과 똑같아지긴 하거든요..!!
// 따로 상단 div에 조정이 필요할까요?? 이 부분은 잘 모르겠어서 일단 두었습니다!

export default MorePost;
