"use client";
import { useParams } from "next/navigation";
import { Chats } from "../types";
import { ChatItem } from "./ChatItem";

type ChatList = {
  chats: Chats;
};

export const ChatList: React.FC<ChatList> = ({ chats }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      {chats.map((item) => (
        <ChatItem
          dbId={item.id}
          chatId={item.chatId}
          key={item.chatId}
          name={item.name}
          lastMessageAt={item.lastMessageAt}
          isActive={id === item.chatId}
        />
      ))}
    </div>
  );
};
