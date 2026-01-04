"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Message, User } from "@prisma/client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useScrollToBottom } from "../hooks/useScrollToBottom";
import { MessageCopyItemProps } from "../types";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: Partial<
    Message & {
      sendUser: User;
      replyMessage: Message;
      sendUserId?: string;
      senderName?: string;
    }
  >[];
  chatId: string;
  handleDelete: () => void;
  handleReplyMessage: (message: MessageCopyItemProps) => void;
};

export const MessageBox: React.FC<MessageListProps> = ({
  messages,
  handleDelete,
  handleReplyMessage,
}) => {
  const { user } = useAuth();
  const [isScrolling, setIsScrolling] = useState(false);
  const { containerRef, isAtBottom, scrollToBottom, checkScrollPosition } =
    useScrollToBottom();

  const handleScrollToBottom = async () => {
    setIsScrolling(true);
    await scrollToBottom();
    setIsScrolling(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex
      direction="column"
      onScroll={checkScrollPosition}
      ref={containerRef}
      gap="2"
      className="grow bg-stone-800/30 overflow-y-auto max-h-[700] min-w-70 min-h-100 h-[-webkit-fill-available] h-[-moz-available]"
    >
      {messages.map((message, index) => {
        const sendUserId =
          Number(message?.sendUserId) || Number(message?.sendUser?.id);
        const senderName = message?.senderName || message.sendUser?.name;
        const isAuthor = Number(user?.id) === sendUserId;
        const messageId = message.id || message.createdAt;
        return (
          <MessageItem
            id={message.id}
            text={message.text}
            onDelete={handleDelete}
            createdAt={message.createdAt}
            isAuthor={isAuthor}
            senderName={senderName}
            key={`${messageId}${index}`}
            handleReplyMessage={handleReplyMessage}
            replyMessage={message.replyMessage}
          />
        );
      })}
      {!isAtBottom && messages.length > 10 && (
        <IconButton
          radius="full"
          variant="soft"
          className={`!cursor-pointer hover:bg-cyan-700! !fixed !bottom-45 !right-4 !translate-x-0 !left-auto !self-end !rounded-[50%] !bg-cyan-800 !p-2 ${
            isScrolling
              ? "animate-pulse scale-95"
              : "animate-bounce hover:scale-110"
          }`}
          onClick={handleScrollToBottom}
        >
          <ArrowDownIcon
            className={`${isScrolling ? "rotate-180" : ""}`}
            width="20"
            height="20"
          />
        </IconButton>
      )}
    </Flex>
  );
};
