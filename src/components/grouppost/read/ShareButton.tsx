"use client";

import React, { useState } from "react";
import ShareModal from "./ShareModal";

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
      >
        공유하기 버튼
      </button>
      {isModalOpen && (
        <ShareModal
          //  id={id}
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
