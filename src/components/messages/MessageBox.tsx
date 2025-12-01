"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Message, User } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: Partial<Message & { sendUser: User }>[];
  chatId: string;
  handleDelete: () => void;
};

export const MessageBox: React.FC<MessageListProps> = ({
  messages,
  handleDelete,
}) => {
  const { user } = useAuth();
  return (
    <Flex
      direction="column"
      gap="2"
      className="bg-stone-800/30 overflow-y-auto max-h-[700] min-w-70 min-h-100 h-[-webkit-fill-available] h-[-moz-available]"
    >
      {messages.map((message) => {
        const isAuthor = user?.email === message?.sendUser?.email;
        return (
          <MessageItem
            id={message.id}
            text={message.text}
            onDelete={handleDelete}
            createdAt={message.createdAt}
            isAuthor={isAuthor}
            senderName={message?.sendUser?.name}
            key={`${message.id}${message.createdAt}`}
          />
        );
      })}
    </Flex>
  );
};
