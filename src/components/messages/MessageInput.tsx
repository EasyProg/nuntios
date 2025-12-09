"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
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
    <div className="flex items-center">
      <textarea
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
          if (!e.shiftKey && e.key === "Enter" && message != "") {
            handleSendMessage(e.currentTarget.value);
            setMessage("");
          }
        }}
        className="w-auto min-w-70 h-auto border-indigo-500 !rounded-md !text-gray-500 !bg-gray-600/30 p-3 outline-none min-h-40 w-full"
      />
      <IconButton
        className={`${
          message !== "" ? "block opacity-100" : "hidden opacity-0"
        }! transition-all! cursor-pointer! bg-cyan-600/50! hover:bg-cyan-400/50! rounded-sm! h-[100%]! transition-discrete!`}
      >
        <ArrowRightIcon
          width="25"
          height="25"
          onClick={() => {
            handleSendMessage(message);
            setMessage("");
          }}
        />
      </IconButton>
    </div>
  );
};
