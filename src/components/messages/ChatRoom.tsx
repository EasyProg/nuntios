"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Message } from "@prisma/client";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";
import { MessageCopyItemProps } from "../types";
import { MessageBox } from "./MessageBox";
import { MessageCopy } from "./MessageCopy";
import { MessageInput } from "./MessageInput";

type ChatProps = {
  messages: Partial<Message>[];
  chatId: string;
  encodePassword?: string;
};

export const ChatRoom: React.FC<ChatProps> = ({ messages, chatId }) => {
  const [chatMessages, setChatMessages] =
    useState<Partial<Message>[]>(messages);
  const socket = useSocket();
  const { user } = useAuth();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [textInputValue, setTextInputValue] = useState("");
  const [replyMessage, setReplyMessage] = useState<MessageCopyItemProps | null>(
    null,
  );

  const handleDelete = async (id?: number, date?: Date) => {
    const filteredItems = [
      ...chatMessages.filter((item) =>
        id ? item.id !== id : item.createdAt !== date,
      ),
    ];
    const preLastMessage = filteredItems.at(-1);
    if (id) {
      await axios.post(`/api/message/${id}`, {
        id,
      });
      setChatMessages(filteredItems);
    } else if (date) {
      await axios.post(`/api/message/${date}`, {
        date,
        message: preLastMessage,
        chatId,
      });
      setChatMessages(filteredItems);
    }
    socket?.emit("update-chat-message", {
      message: preLastMessage,
      chatId,
    });
  };

  useEffect(() => {
    if (!socket) return;

    // Entering to the chatroom
    socket.emit("join-room", chatId);

    // Listening to new messages
    socket.on("receive-message", (newMessage) => {
      setChatMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          createdAt: new Date(newMessage.createdAt),
          replyMessage: newMessage.replyMessage
            ? {
                ...newMessage.replyMessage,
                createdAt: new Date(newMessage.replyMessage.createdAt),
              }
            : null,
        },
      ]);
    });

    return () => {
      socket;
      socket.off("receive-message");
    };
  }, [socket, chatId]);

  const handleReplyMessage = (message: Partial<Message>) => {
    inputRef?.current?.focus();
    setTextInputValue("");
    setReplyMessage({ ...message });
  };

  const handleSendMessage = async (value: string) => {
    // Sending message with socket
    setReplyMessage(null);
    const { dbId, encodePassword } = JSON.parse(
      sessionStorage.getItem("chat_data")!,
    );

    if (value !== "") {
      socket?.emit("send-message", {
        dbId,
        chatId,
        encodePassword,
        message: {
          text: value,
          createdAt: new Date(),
          sendUserId: user?.id,
          replyMessage,
        },
      });
    }
  };

  const messageBox = useMemo(() => {
    return (
      <MessageBox
        messages={chatMessages}
        chatId={chatId}
        handleDelete={handleDelete}
        handleReplyMessage={handleReplyMessage}
      />
    );
  }, [chatMessages, chatId]);

  return (
    <div className="h-[90vh] flex flex-col justify-between">
      {messageBox}
      <MessageInput
        handleSendMessage={handleSendMessage}
        chatId={chatId}
        replyMessage={<MessageCopy {...replyMessage} />}
        ref={inputRef}
        value={textInputValue}
        onChange={setTextInputValue}
      />
    </div>
  );
};
