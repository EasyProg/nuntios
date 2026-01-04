"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { ReactNode, RefAttributes } from "react";
import useControllableState from "../hooks/useControllableState";

type MessageInput = {
  value: string;
  caretPos: 0;
};

type MessageInputProps = {
  placeholder?: string;
  chatId: string;
  handleSendMessage: (message: string) => void;
  replyMessage?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  setCaret: (value: number) => void;
};

export const MessageInput: React.FC<
  MessageInputProps & RefAttributes<HTMLTextAreaElement>
> = ({
  placeholder = "Input some text here ... ",
  handleSendMessage,
  ref,
  replyMessage,
  value,
  onChange,
  setCaret,
}) => {
  const [message, setMessage] = useControllableState<string>({
    defaultValue: "",
    value,
    onChange,
  });

  return (
    <div className="flex items-start">
      <div className="flex flex-col w-auto min-w-70 h-auto border-indigo-500 !rounded-md !text-gray-500 !bg-gray-600/30 p-3 outline-none min-h-40 w-full">
        {replyMessage}
        <textarea
          placeholder={placeholder}
          value={message}
          rows={2}
          className="outline-none field-sizing-content max-w-[700] resize-none w-full"
          onChange={(e) => setMessage(e.target.value)}
          ref={ref}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
            if (!e.shiftKey && e.key === "Enter" && message != "") {
              handleSendMessage(e.currentTarget.value);
              setMessage("");
            }
          }}
          onMouseDown={(e: React.MouseEvent<HTMLTextAreaElement>) =>
            setCaret((e.target as HTMLTextAreaElement).selectionStart)
          }
        />
      </div>
      <IconButton
        asChild
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
