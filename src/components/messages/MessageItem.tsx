"use client";

import { Flex, Text } from "@radix-ui/themes";

type MessageItemProps = {
  content: string;
  sentAt?: Date;
  sender?: string;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  content,
  sentAt,
  sender,
}) => {
  return (
    <Flex className="bg-cyan-500/40 rounded-md m-3" justify="between">
      <Flex direction="column" className="p-3">
        <Text className="text-xs text-slate-800 font-bold">{sender}</Text>
        <Text>{content}</Text>
      </Flex>
      <Text className="text-xs self-end pr-2 pb-1 text-slate-800 font-bold">
        {sentAt?.toString().slice(11, 19)}
      </Text>
    </Flex>
  );
};
