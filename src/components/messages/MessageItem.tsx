"use client";

import { Message, User } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";

type MessageItemProps = {
  message: Partial<Message & { sendUser: User }>;
  onDelete: (messageId?: number, createdAt?: Date) => void;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onDelete,
}) => {
  const { name, createdAt, id } = message;
  const formattedDate =
    createdAt instanceof Date
      ? createdAt?.toTimeString().substring(0, 9)
      : createdAt?.substring(11, 19);
  return (
    <Flex className="bg-cyan-500/40 rounded-md m-3" justify="between">
      <Flex direction="column" className="p-3">
        <Text className="text-xs text-gray-400 font-bold">
          {message?.sendUser?.name}
        </Text>
        <Text>{name}</Text>
      </Flex>
      <Text className="flex space-between text-xs self-end pr-2 pb-1 font-bold text-gray-400">
        {formattedDate}
        <div
          onClick={() => onDelete(id, createdAt)}
          className="ml-3 cursor-pointer"
        >
          x
        </div>
      </Text>
    </Flex>
  );
};
