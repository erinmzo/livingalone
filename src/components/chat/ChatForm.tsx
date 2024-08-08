"use client";
import { insertAlarm } from "@/apis/alarm";
import { getMyProfile } from "@/apis/mypage";
import { createClient } from "@/supabase/client";
import { TAddAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { Notify, Report } from "notiflix";
import { useEffect, useState } from "react";

type TChat = {
  created_at: string;
  id: string;
  profiles: { user_id: string; nickname: string };
  text: string;
  user_id: string;
};

export default function ChatForm({ postId, userId }: { postId: string; userId: string }) {
  const supabase = createClient();
  const user = useAuthStore((state) => state.user);
  const id = user?.id as string;
  const [messages, setMessages] = useState<TChat[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchInitialMessages = async () => {
    const { data } = await supabase
      .from("chat")
      .select("*, profiles!inner( user_id , nickname)")
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
    <div className="w-full min-w-full max-w-[682px] mx-auto">
      <div className="rounded-lg border border-gray-2 overflow-y-auto h-[140px] scroll-smooth snap-end">
        <div className="flex p-[24px] flex-col justify-end gap-2">
          {messages.length > 0 ? (
            <>
              <div>
                {messages.map((message) => (
                  <div key={message.id} className="grid grid-cols-[90px_1fr] text-gray-5 gap-[10px] mt-2">
                    {userId === message.user_id ? (
                      <span className="font-bold truncate text-main-7">작성자</span>
                    ) : (
                      <span className="font-bold truncate">{message.profiles.nickname}</span>
                    )}
                    <div>
                      <span>{message.text}</span>
                      <span className="text-gray-3 text-[12px] ml-2">
                        {message.created_at.split("T").join(" ").substring(0, 16)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center text-gray-2 py-[30px]">공구 채팅을 시작해보세요</div>
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
        <button type="submit" className="py-[10px] px-[24px] bg-main-8 border-main-8 text-white rounded-full font-bold">
          보내기
        </button>
      </form>
    </div>
  );
}
