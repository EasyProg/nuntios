"use client";
import { Chat } from "@prisma/client";
import { useParams } from "next/navigation";
import { ChatItem } from "./ChatItem";

type ChatList = {
  chats: Chat[];
};

export const ChatList: React.FC<ChatList> = ({ chats }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      {chats.map((item) => (
        <ChatItem
          chatId={item.chatId}
          key={item.chatId}
          name={item.name}
          lastMessageAt={item.lastMessageAt.toLocaleDateString()}
          isActive={id === item.chatId}
        />
      ))}
    </div>
  );
};
