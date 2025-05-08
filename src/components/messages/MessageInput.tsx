"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, TextArea } from "@radix-ui/themes";
import { useState } from "react";

type MessageInputProps = {
  placeholder?: string;
  chatId: string;
};

export const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  chatId,
}) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (value: string) => {
    console.log("Send message");
    if (!value.trim) return;
    setMessage("");
    // await sendMesssage(chatId, message)
  };

  return (
    <Flex gap="3">
      <TextArea
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton size="3" variant="soft" onClick={() => handleSubmit}>
        <MagnifyingGlassIcon width="22" height="22" />
      </IconButton>
    </Flex>
  );
};
