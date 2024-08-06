"use client";

import React from "react";
import KakaoShareButton from "./KakaoShareButton";
import { Notify } from "notiflix";

interface PropsType {
  // id: string;
  postId: string;
  title: string;
  content: string;
  imgUrl: string;
  onClose: () => void;
}

function ShareModal({ postId, title, content, imgUrl, onClose }: PropsType) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="z-10 p-6 w-[544px] box-border bg-white rounded-2xl">
        <div className="flex justify-center">
          <h6 className="font-bold text-[24px]">게시물로 공유</h6>
        </div>
        <div className="flex justify-between">
          <KakaoShareButton
            postId={postId}
            title={title}
            content={content}
            imgUrl={imgUrl}
          />
          <div className="w-[400px] h-[60px] p-2 border border-gray-2 rounded-full flex items-center justify-between">
            <input value={window.location.href} readOnly />
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  Notify.success("링크가 복사되었습니다.");
                } catch (e) {
                  Notify.failure("링크를 복사하지 못 했습니다.");
                }
              }}
            >
              복사
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50"
      ></div>
    </div>
  );
}

export default ShareModal;
