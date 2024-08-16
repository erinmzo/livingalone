"use client";

import Image from "next/image";
import { Notify } from "notiflix";
import KakaoShareButton from "./KakaoShareButton";

interface PropsType {
  postId: string;
  title: string;
  content: string;
  imgUrl: string;
  onClose: () => void;
}

function ShareModal({ postId, title, content, imgUrl, onClose }: PropsType) {
  const copyUrlHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Notify.success("링크가 복사되었습니다.");
    } catch (e) {
      Notify.failure("링크를 복사하지 못 했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="z-10 px-5 md:px-8 pb-6 md:pb-9 pt-3 md:pt-5 w-[343px] md:w-[544px] box-border bg-white rounded-2xl">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <Image src="/img/icon-delete.png" alt="모달 닫기 버튼" width={24} height={24} />
          </button>
        </div>
        <div className="flex justify-center">
          <h6 className="font-bold text-[18px] md:text-[24px] mb-5 md:mb-6">게시물로 공유</h6>
        </div>
        <div className="flex justify-center gap-6 md:gap-0 md:justify-between items-center">
          <KakaoShareButton title={title} content={content} imgUrl={imgUrl} />
          <div className="hidden md:flex w-[400px] h-[60px] p-2 border border-gray-2 rounded-full items-center justify-between gap-2">
            <input value={window.location.href} readOnly className="w-full" />
            <button
              className="border border-main-8 w-[80px] shrink-0 rounded-full h-full text-main-8 text-[20px]"
              onClick={copyUrlHandler}
            >
              복사
            </button>
          </div>
          <button
            className="md:hidden border border-main-8 w-[92px] h-[44px] rounded-full text-xl text-main-8 bg-main-1"
            onClick={copyUrlHandler}
          >
            링크복사
          </button>
        </div>
      </div>
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
}

export default ShareModal;
