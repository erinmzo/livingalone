"use client";
import { createClient } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { Report } from "notiflix";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TChat = {
  created_at: string;
  id: string;
  profiles: { user_id: string; nickname: string };
  text: string;
  user_id: string;
};

export default function ChatForm({ postId }: { postId: string }) {
  const supabase = createClient();
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<TChat[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
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

    fetchInitialMessages();

    const messageSubscription = supabase
      .channel("chat1")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat" }, (payload: any) => {
        setMessages((currentMessages) => [...currentMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return Report.failure("로그인 후 이용하실 수 있습니다.", "", "확인");

    if (user) {
      const chatInfo = {
        id: uuidv4(),
        text: newMessage,
        user_id: user?.id,
        created_at: new Date().toISOString(),
        post_id: postId,
      };

      const { error } = await supabase.from("chat").insert(chatInfo);

      if (error) {
        console.error("Error sending message:", error);
      } else {
        setNewMessage("");
      }
    }
  };

  return (
    <div className="w-full min-w-full max-w-[682px] mx-auto">
      <div className="rounded-lg p-[24px] border border-gray-2">
        <div className="flex flex-col">
          <div className="h-[100px] scroll-smooth overflow-x-scroll scrolling-touch flex flex-col justify-end gap-2">
            {messages.map((message) => (
              <div key={message.id} className="grid grid-cols-[70px_1fr] text-gray-5 gap-[24px]">
                <span className="font-bold mr-3 truncate">{message.profiles.nickname}</span>
                <span className="grow">{message.text}</span>
              </div>
            ))}
          </div>
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
