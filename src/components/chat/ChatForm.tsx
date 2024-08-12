"use client";
import { insertAlarm } from "@/apis/alarm";
import { getMyProfile } from "@/apis/mypage";
import { createClient } from "@/supabase/client";
import { TAddAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { Notify, Report } from "notiflix";
import { useEffect, useRef, useState } from "react";

type TChat = {
  created_at: string;
  id: string;
  profiles: { user_id: string; nickname: string; profile_image_url: string };
  text: string;
  user_id: string;
};

export default function ChatForm({ postId, userId, onClose }: { postId: string; userId: string; onClose: () => void }) {
  const supabase = createClient();
  const user = useAuthStore((state) => state.user);
  const id = user?.id as string;
  const [messages, setMessages] = useState<TChat[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchInitialMessages = async () => {
    const { data } = await supabase
      .from("chat")
      .select("*, profiles!inner( user_id , nickname, profile_image_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);
    }
  };
  useEffect(() => {
    fetchInitialMessages();

    const messageSubscription = supabase
      .channel("chat1")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat" }, async (payload: any) => {
        const profile = await getMyProfile(payload.new.user_id);

        setMessages((currentMessages) => [
          ...currentMessages,
          { ...payload.new, profiles: { nickname: profile.nickname } },
        ]);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { mutate: addAlarm } = useMutation({
    mutationFn: (chatAlarmData: TAddAlarm) => insertAlarm(chatAlarmData),
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage) return Notify.failure("내용을 입력해주세요.");

    if (!user) return Report.failure("로그인 후 이용하실 수 있습니다.", "", "확인");

    if (user) {
      const chatInfo = {
        text: newMessage,
        user_id: user.id,
        post_id: postId,
      };

      const { error } = await supabase.from("chat").insert(chatInfo);

      if (error) {
        Notify.failure(`채팅 전송에 실패했습니다. ${error}`);
      } else {
        setNewMessage("");
      }

      if (id !== userId) {
        const chatAlarmData = {
          type: "chat",
          user_id: userId,
          group_post_id: postId,
          must_post_id: null,
          link: `/grouppost/read/${postId}`,
          is_read: false,
        };
        addAlarm(chatAlarmData);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99] md:px-[16px] py-[0px] md:px-0 md:py-[80px]">
      <div className="relative w-full mx-auto rounded-lg bg-gray-6 p-[16px] md:pt-[32px] rounded-lg z-[999] box-border flex flex-col justify-center items-center top-[-30px] max-w-[300px] md:max-w-[343px] h-full max-h-[500px] md:max-h-[760px] ">
        {messages.length > 0 ? (
          <div className="overflow-y-scroll flex flex-col gap-[10px] py-[16px]">
            {messages.map((message) =>
              user && user.id === message.user_id ? (
                <>
                  <div className="flex flex-col justify-end">
                    <div className="flex justify-end items-end gap-[10px]">
                      <span className="text-gray-3 text-[10px]">
                        {message.created_at.split("T").join(" ").substring(0, 16)}
                      </span>
                      <div className="flex flex-col gap-1 p-[10px] bg-white rounded-lg">
                        <span>{message.text}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div key={message.id} className="flex flex-col justify-start">
                  <div className="flex items-end text-gray-5 gap-[10px] mt-2">
                    <div className="grid grid-cols-[32px_1fr] gap-2">
                      <div className="relative overflow-hidden w-[32px] h-[32px] rounded-full aspect-square">
                        <Image
                          src={message.profiles.profile_image_url}
                          alt={message.profiles.nickname}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1 p-[10px] bg-white rounded-lg">
                        <span className="text-[10px] text-gray-3 truncate">{message.profiles.nickname}</span>
                        <span>{message.text}</span>
                      </div>
                    </div>
                    <span className="text-gray-3 text-[10px]">
                      {message.created_at.split("T").join(" ").substring(0, 16)}
                    </span>
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex justify-center text-gray-2 h-full">공구 채팅을 시작해보세요</div>
        )}
        <form onSubmit={handleSendMessage} className="flex items-center gap-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="채팅을 입력하세요."
            className="border border-gray-4 rounded-lg py-[5px] px-[16px] grow text-[12px]"
          />
          <button type="submit">
            <Image src="/img/icon-send.svg" alt="채팅 보내기" width={32} height={32} />
          </button>
        </form>
        <button onClick={onClose} className="absolute right-[8px] top-[8px]">
          <Image src="/img/icon-close.svg" alt="닫기" width={16} height={16} />
        </button>
      </div>
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
}
