"use client";

import { Message } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Flex direction="column" gap="2">
      {messages.map((message) => (
        <MessageItem
          content={message.name}
          sentAt={message.createdAt.toLocaleString()}
        />
      ))}
    </Flex>
  );
};
