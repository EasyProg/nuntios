"use client";

import { modifyChats } from "@/helpers/helpers";
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
    const chatsWithStringDate = modifyChats(chatsInput);
    setChats(chatsWithStringDate);
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
