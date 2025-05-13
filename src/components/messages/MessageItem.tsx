"use client";

import { Flex, Text } from "@radix-ui/themes";

type MessageItemProps = {
  content: string;
  sentAt?: string;
  sender?: string;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  content,
  sentAt,
  sender,
}) => {
  return (
    <Flex>
      <Text>{sender}</Text>
      <Text>{content}</Text>
      <Text>{sentAt}</Text>
    </Flex>
  );
};
