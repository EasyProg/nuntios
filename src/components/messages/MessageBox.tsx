"use client";

import { Message } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: Partial<Message>[];
  chatId: string;
  handleDelete: () => void;
};

export const MessageBox: React.FC<MessageListProps> = ({
  messages,
  handleDelete,
}) => {
  return (
    <Flex
      direction="column"
      gap="2"
      className="bg-stone-800/30 overflow-y-auto max-h-[700] min-w-70 min-h-100 h-[-webkit-fill-available] h-[-moz-available]"
    >
      {messages.map((message) => {
        return (
          <MessageItem
            onDelete={handleDelete}
            message={message}
            key={`${message.id}${message.createdAt}`}
          />
        );
      })}
    </Flex>
  );
};
