"use client";

import { modifyChats, modifyDate } from "@/helpers/helpers";
import { Chat } from "@prisma/client";
import { useEffect, useState } from "react";
import { ChatList } from "../chat/ChatList";
import useSocket from "../hooks/useSocket";
import { ChatsLocalized } from "../types";
import { Header } from "./Header";

type Sidebar = {
  chats: Chat[];
};

export const Sidebar: React.FC<Sidebar> = ({ chats: chatsInput }) => {
  const [chats, setChats] = useState<ChatsLocalized>([]);
  const socket = useSocket();

  useEffect(() => {
    const chatsWithStringDate = modifyChats(chatsInput);
    setChats(chatsWithStringDate);
  }, [chatsInput]);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      "update-chat-message",
      ({ message = { text: "", createdAt: "" }, chatId }) => {
        const newChats = modifyChats([...chatsInput])
          .map((chat) => {
            if (chat.chatId === chatId) {
              return {
                ...chat,
                lastMessage: message.text,
                lastMessageAt: message.createdAt,
                lastMessageAtLocalized: modifyDate(message.createdAt),
              };
            } else return chat;
          })
          .sort(
            (a, b) =>
              new Date(b.lastMessageAt).valueOf() -
              new Date(a.lastMessageAt).valueOf(),
          );
        setChats(newChats);
      },
    );

    return () => {
      socket;
      socket.off("update-chat-message");
    };
  }, [socket, chatsInput]);

  return (
    <div className="w-3xs p-3 h-screen text-xs">
      <Header />
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
