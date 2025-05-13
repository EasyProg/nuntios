"use client";

import { Message } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: Partial<Message>[];
};

export const MessageBox: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Flex
      direction="column"
      gap="2"
      className="bg-stone-800/30 min-w-180 min-h-250"
    >
      {messages.map((message) => (
        <MessageItem
          content={message.name ?? ""}
          sentAt={message.createdAt?.toLocaleString()}
        />
      ))}
    </Flex>
  );
};
