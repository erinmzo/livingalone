"use client";
import { insertAlarm } from "@/apis/alarm";
import { getMyProfile } from "@/apis/mypage";
import { createClient } from "@/supabase/client";
import { TAddAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { Notify, Report } from "notiflix";
import { useEffect, useState } from "react";

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

  const { mutate: addAlarm } = useMutation({
    mutationFn: (chatAlarmData: TAddAlarm) => insertAlarm(chatAlarmData),
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="fixed inset-0 flex items-center justify-center z-[99] px-[16px] py-[30px] md:px-0 md:py-[80px]">
      <div className="relative w-full max-w-[680px] h-full max-h-[760px] overflow-y-scroll mx-auto bg-gray-6 rounded-lg z-[999] box-border p-[32px]">
        <div className="rounded-lg border border-gray-2">
          <div className="flex p-[24px] flex-col justify-end gap-2">
            {messages.length > 0 ? (
              <>
                <div>
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-end text-gray-5 gap-[10px] mt-2">
                      <div className="grid grid-cols-[24px_1fr] gap-2">
                        <div className="relative w-[24px] h-[24px] aspect-square">
                          <Image
                            src={message.profiles.profile_image_url}
                            alt={message.profiles.nickname}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-2 p-[10px]">
                          <span className="font-bold truncate">{message.profiles.nickname}</span>
                          <span>{message.text}</span>
                        </div>
                      </div>
                      <span className="text-gray-3 text-[12px]">
                        {message.created_at.split("T").join(" ").substring(0, 16)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex justify-center text-gray-2 h-full">공구 채팅을 시작해보세요</div>
            )}
          </div>
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center gap-1 mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="채팅을 입력하세요."
            className="border border-gray-2 rounded-full py-[10px] px-[24px] grow"
          />
          <button
            type="submit"
            className="py-[10px] px-[24px] bg-main-8 border-main-8 text-white rounded-full font-bold"
          >
            보내기
          </button>
        </form>
        <button onClick={onClose} className="absolute right-0 top-0">
          닫기
        </button>
      </div>
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
}
