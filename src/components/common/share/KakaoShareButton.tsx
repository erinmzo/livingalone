"use client";

import React from "react";

function KakaoShareButton({
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
  const handleShareToKakao = () => {
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
          title: "자세히 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };
  return (
    <button onClick={handleShareToKakao} className="p-5 bg-main-8">
      카카오톡 공유하기
    </button>
  );
}

export default KakaoShareButton;
