"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Chat } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ChatsLocalized } from "../types";
import { ChatItem } from "./ChatItem";

type ChatList = {
  chats: ChatsLocalized;
};

export const ChatList: React.FC<ChatList> = ({ chats }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [filteredChats, setFilteredChats] = useState<Chat[]>(chats);
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
    <div className="d-flex max-h-[680px] min-w-[240px] overflow-auto">
      {chats.map((item) => (
        <ChatItem
          {...item}
          lastMessageAt={item.lastMessageAtLocalized}
          isActive={id === item.chatId}
          onDelete={onDelete}
          key={item.chatId}
          dbId={item.id}
        />
      ))}
    </div>
  );
};
