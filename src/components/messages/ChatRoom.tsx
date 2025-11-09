"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Message } from "@prisma/client";
import axios from "axios";
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
  const { user } = useAuth();

  const handleDelete = async (id?: number, date?: Date) => {
    if (id) {
      await axios.post(`/api/message/${id}`, {
        id,
      });
      setChatMessages([...chatMessages.filter((item) => item.id !== id)]);
    } else if (date) {
      await axios.post(`/api/message/${date}`, {
        date,
      });
      setChatMessages([
        ...chatMessages.filter((item) => item.createdAt !== date),
      ]);
    }
  };

  useEffect(() => {
    if (!socket) return;

    // Entering to the chatroom
    socket.emit("join-room", chatId);

    // Listening to new messages
    socket.on("receive-message", (newMessage) => {
      setChatMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket;
      socket.off("receive-message");
    };
  }, [socket, chatId]);

  const handleSendMessage = async (value: string) => {
    // Sending message with socket
    socket?.emit("send-message", {
      chatId,
      message: {
        name: value,
        createdAt: new Date(),
        sendUserId: user?.id,
      },
    });
  };

  return (
    <div className="h-[90vh] flex flex-col justify-between">
      <MessageBox
        messages={chatMessages}
        chatId={chatId}
        handleDelete={handleDelete}
      />
      <MessageInput handleSendMessage={handleSendMessage} chatId={chatId} />
    </div>
  );
};
