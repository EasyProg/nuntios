"use client";

import { Chat, User } from "@prisma/client";
import { ChatList } from "../chat/ChatList";
import { Header } from "./Header";

type Sidebar = {
  chats: Chat[];
  users: User[];
};

export const Sidebar: React.FC<Sidebar> = ({ chats, users }) => {
  return (
    <div className="w-3xs p-3 h-screen text-xs">
      <Header users={users} />
      <div className="flex justify-center items-center h-full">
        {!chats.length ? (
          "No active chats please create some ..."
        ) : (
          <ChatList chats={chats} />
        )}
      </div>
    </div>
  );
};
