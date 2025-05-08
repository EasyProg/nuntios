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
          name={item.name}
          lastMessageAt={item.lastMessageAt.toISOString()}
        />
      ))}
    </div>
  );
};
