"use client";

import Image from "next/image";

function KakaoShareButton({ title, content, imgUrl }: { title: string; content: string; imgUrl: string }) {
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
    <button onClick={handleShareToKakao} className="">
      <Image src="/img/icon-kakao-share.png" alt="카카오 공유 버튼" width={56} height={56} />
      <p className="text-[10px] text-black mt-1">카카오톡 공유</p>
    </button>
  );
}

export default KakaoShareButton;
