"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Message } from "@prisma/client";
import axios from "axios";
import { Popover } from "radix-ui";
import { useEffect, useMemo, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";
import { MessageCopyItemProps } from "../types";
import { additionalEmojies, emojis } from "../ui/consts";
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
  const [caret, setCaret] = useState(0);
  const [isFullState, setIsFullState] = useState<boolean>(false);
  const [popoverOpen, setIsPopoverOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState<MessageCopyItemProps | null>(
    null,
  );

  const emojies = useMemo(
    () => (!isFullState ? emojis : [...emojis, ...additionalEmojies]),
    [isFullState],
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
      const replyPart = {
        createdAt: new Date(newMessage.createdAt),
        replyMessage: newMessage.replyMessage
          ? {
              ...newMessage.replyMessage,
              createdAt: new Date(newMessage.replyMessage.createdAt),
            }
          : null,
      };
      setChatMessages((prev) => {
        return [
          ...prev,
          {
            ...newMessage,
            ...replyPart,
          },
        ];
      });

      return () => {
        socket;
        socket.off("receive-message");
      };
    });
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
          senderName: user?.name,
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
      <Popover.Root open={popoverOpen}>
        <Popover.Trigger
          onClick={(e) => e.preventDefault()}
          onDoubleClick={() => setIsPopoverOpen(true)}
        >
          <MessageInput
            ref={inputRef}
            chatId={chatId}
            setCaret={setCaret}
            value={textInputValue}
            onChange={setTextInputValue}
            handleSendMessage={handleSendMessage}
            replyMessage={<MessageCopy {...replyMessage} />}
          />
        </Popover.Trigger>
        <Popover.Content
          className="w-[260px] flex flex-wrap rounded bg-stone-800 p-2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
          align="start"
          onBlur={() => setIsPopoverOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsPopoverOpen(false);
              inputRef?.current?.focus();
              inputRef?.current?.setSelectionRange(caret, caret);
            }
          }}
        >
          {emojies.map((item, index) => (
            <div
              key={index}
              className="pl-2"
              onClick={() => {
                const firstPart = textInputValue.substring(0, caret);
                const secondPart = textInputValue.substring(caret);
                setTextInputValue(`${firstPart}${item}${secondPart}`);
              }}
            >
              {item}
            </div>
          ))}
          <p
            className="w-[100%] text-center"
            onClick={() => setIsFullState((prev) => !prev)}
          >
            {!isFullState ? "Load more ... " : "Load less"}
          </p>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
