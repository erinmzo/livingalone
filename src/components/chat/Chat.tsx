"use client";

import { useState } from "react";
import ChatForm from "./ChatForm";
interface ChatProps {
  postId: string;
  userId: string;
}

function Chat({ postId, userId }: ChatProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-4 border border-gray-4 rounded-full w-full md:w-[343px] font-bold text-base md:text-xl flex items-center justify-center h-[35px] md:h-[44px]"
        >
          실시간 채팅 참여하기
        </button>
      </div>
      {isModalOpen && (
        <ChatForm postId={postId} userId={userId} onClose={onClose} />
      )}
    </>
  );
}
export default Chat;
