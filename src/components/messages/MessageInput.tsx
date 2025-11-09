"use client";

import { useState } from "react";

type MessageInputProps = {
  placeholder?: string;
  chatId: string;
  handleSendMessage: (message: string) => void;
};

export const MessageInput: React.FC<MessageInputProps> = ({
  placeholder = "Input some text here ... ",
  handleSendMessage,
}) => {
  const [message, setMessage] = useState<string>("");

  return (
    <textarea
      placeholder={placeholder}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === "Enter") {
          e.preventDefault();
          handleSendMessage(e.currentTarget.value);
          setMessage("");
        }
      }}
      className="w-auto min-w-70 h-auto border-indigo-500 !rounded-md !text-gray-500 !bg-gray-600/30 p-3 outline-none min-h-40 w-full"
    />
  );
};
