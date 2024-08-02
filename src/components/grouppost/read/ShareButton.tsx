"use client";

import React from "react";

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
  const handleShearToKakao = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${title}`,
        description: `${content}`,
        imageUrl: `${imgUrl}`,
        link: {
          mobileWebUrl: "https://livingalone.vercel.app/",
          webUrl: "https://livingalone.vercel.app/",
        },
      },
      buttons: [
        {
          title: "공구템 보러가기",
          link: {
            mobileWebUrl: `https://livingalone.vercel.app/grouppost/read/${postId}`,
            webUrl: `https://livingalone.vercel.app/grouppost/read/${postId}`,
          },
        },
      ],
    });
  };
  return (
    <button onClick={handleShearToKakao} className="p-5 bg-main-8">
      카카오톡 공유하기
    </button>
  );
}

export default ShareButton;
