"use client";

import { Chat, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { ChatList } from "../chat/ChatList";
import { Chats } from "../types";
import { Header } from "./Header";

type Sidebar = {
  chats: Chat[];
  users: User[];
};

export const Sidebar: React.FC<Sidebar> = ({ chats: chatsInput, users }) => {
  const [chats, setChats] = useState<Chats>([]);

  useEffect(() => {
    const now = Date.now();
    const modifyChats = chatsInput.map((item) => {
      const isMoreOneDay =
        (now - item.lastMessageAt.getTime()) / (1000 * 60 * 60) > 24;
      return {
        ...item,
        lastMessageAt: isMoreOneDay
          ? item.lastMessageAt.toLocaleDateString()
          : item.lastMessageAt.toLocaleTimeString(),
      };
    });
    setChats(modifyChats);
  }, [chatsInput]);

  return (
    <div className="w-3xs p-3 h-screen text-xs">
      <Header users={users} />
      <div className="flex items-start h-full w-full mt-2">
        {!chats.length ? (
          "No active chats please create some ..."
        ) : (
          <ChatList chats={chats} />
        )}
      </div>
    </div>
  );
};
