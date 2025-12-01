"use client";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Chats } from "../types";
import { ChatItem } from "./ChatItem";

type ChatList = {
  chats: Chats;
};

export const ChatList: React.FC<ChatList> = ({ chats }) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [filteredChats, setFilteredChats] = useState<Chats>(chats);
  const onDelete = async (id: number) => {
    await axios.post(`/api/chat/${id}`, {
      id,
      userId: user?.id,
    });
    setFilteredChats([...filteredChats.filter((item) => item.id !== id)]);
    router.push("/chat");
    router.refresh();
  };
  return (
    <div className="d-flex">
      {chats.map((item) => (
        <ChatItem
          dbId={item.id}
          chatId={item.chatId}
          key={item.chatId}
          name={item.name}
          lastMessage={item.lastMessage}
          lastMessageAt={item.lastMessageAt}
          isActive={id === item.chatId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
