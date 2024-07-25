"use client";
import { createClient } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TChat = {
  created_at: string;
  id: string;
  profiles: { nickname: string };
  text: string;
  user_id: string;
};

export default function Home() {
  const supabase = createClient();
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<TChat[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const { data, error } = await supabase
        .from("chat")
        .select("*, profiles!inner(nickname)")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else if (data) {
        // setMessages(data);
        console.log(data);
      }
    };

    fetchInitialMessages();

    const messageSubscription = supabase
      .channel("public:chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat" }, (payload: any) => {
        setMessages((currentMessages) => [...currentMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [supabase]);

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
    <div>
      <h1>Realtime Chat</h1>
      <div id="chat-container">
        <div id="messages">
          {messages.map((msg) => (
            <div key={msg.id}>
              <span>{msg.profiles.nickname}</span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
