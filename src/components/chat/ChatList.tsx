"use client";
import { Chat } from "@prisma/client";
import { ChatItem } from "./ChatItem";

type ChatList = {
  chats: Chat[];
};

export const ChatList: React.FC<ChatList> = ({ chats }) => {
  return (
    <div>
      {chats.map((item) => (
        <ChatItem
          chatId={item.chatId}
          key={item.chatId}
          name={item.name}
          lastMessageAt={item.lastMessageAt.toLocaleDateString()}
        />
      ))}
    </div>
  );
};
