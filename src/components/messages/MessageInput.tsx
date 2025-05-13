"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, TextArea } from "@radix-ui/themes";
import { useState } from "react";

type MessageInputProps = {
  placeholder?: string;
  chatId: string;
  handleSendMessage: (message: string) => void;
};

export const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  handleSendMessage,
}) => {
  const [message, setMessage] = useState<string>("");

  return (
    <Flex justify="between" gap="2" className="p-2 h-30">
      <TextArea
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-auto min-w-170 h-auto border-indigo-500 !text-gray-500 !bg-gray-600/30"
      />
      <IconButton
        size="3"
        variant="soft"
        onClick={() => handleSendMessage(message)}
      >
        <ArrowRightIcon width="22" height="22" />
      </IconButton>
    </Flex>
  );
};
