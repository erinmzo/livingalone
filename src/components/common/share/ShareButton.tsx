"use client";

import React, { useState } from "react";
import ShareModal from "./ShareModal";
import Image from "next/image";

function ShareButton({
  postId,
  title,
  content,
  imgUrl,
}: {
  postId: string;
  title: string;
  content: string;
  imgUrl: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="shrink-0 w-[44px] md:w-[100px] h-[44px] md:h-auto py-[10px] flex items-center justify-center gap-[6px] bg-gray-1 border border-gray-3 rounded-full"
      >
        <Image
          src="/img/icon-share.png"
          alt="공유 이미지"
          width={16}
          height={22}
          className="w-[16px] h-[22px]"
        />
        <p className="text-gray-3 text-[20px] hidden md:block">공유</p>
      </button>
      {isModalOpen && (
        <ShareModal
          postId={postId}
          title={title}
          content={content}
          imgUrl={imgUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default ShareButton;
