"use client";

import { Message } from "@prisma/client";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { MessageBox } from "./MessageBox";
import { MessageInput } from "./MessageInput";

type ChatProps = {
  messages: Partial<Message>[];
  chatId: string;
};

export const ChatRoom: React.FC<ChatProps> = ({ messages, chatId }) => {
  const [chatMessages, setChatMessages] =
    useState<Partial<Message>[]>(messages);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Entering to the chatroom
    socket.emit("join-room", chatId);

    // Listening to new messages
    socket.on("receive-message", (newMessage) => {
      setChatMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket, chatId]);

  const handleSendMessage = (value: string) => {
    const newMessage = {
      // id: Date.now(),
      name: value,
      senderId: "current-user",
      createdAt: new Date().toISOString(),
    };

    // Seinding message with socket
    socket?.emit("send-message", {
      chatId,
      message: newMessage,
    });

    // Optimistic update
    setChatMessages((prev) => [...prev, newMessage as any]);
  };

  return (
    <>
      <MessageBox messages={chatMessages} />
      <MessageInput handleSendMessage={handleSendMessage} chatId={chatId} />
    </>
  );
};
