"use client";
import { createClient } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TChat = {
  created_at: string;
  id: string;
  profiles: { user_id: string; nickname: string };
  text: string;
  user_id: string;
};

export default function ChatForm() {
  const supabase = createClient();
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<TChat[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const { data } = await supabase
        .from("chat")
        .select("*, profiles!inner( user_id , nickname)")
        .order("created_at", { ascending: true });

      if (data) {
        setMessages(data);
      }
    };

    fetchInitialMessages();

    const messageSubscription = supabase
      .channel("chat1")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat" },
        (payload: any) => {
          setMessages((currentMessages) => [...currentMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      const chatInfo = {
        id: uuidv4(),
        text: newMessage,
        user_id: user?.id,
        created_at: new Date().toISOString(),
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
    <div className="w-[360px] mx-auto">
      <div className="border border-gray-400 p-[30px] rounded-xl h-[500px] overflow-y-scroll flex flex-col justify-end">
        {messages.map((message) => (
          <div key={message.id} className="grid grid-cols-[70px_1fr]">
            <span className="font-bold mr-3 truncate">
              {message.profiles.nickname}
            </span>
            <span className="grow">{message.text}</span>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="mt-[15px] mx-auto w-[320px]"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="채팅을 입력하세요."
          className="border border-gray-400 rounded py-2 px-4 w-[250px]"
        />
        <button type="submit" className="py-2 px-4 bg-black text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}
