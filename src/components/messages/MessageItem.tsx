"use client";

import { formatDateToTime } from "@/helpers/helpers";
import { Flex, Text } from "@radix-ui/themes";
import { ContextMenu } from "radix-ui";
import { MessageCopyItemProps } from "../types";
import { MessageCopy } from "./MessageCopy";

type MessageItemProps = {
  id?: number;
  text?: string;
  createdAt?: Date;
  isAuthor: boolean;
  senderName?: string | null;
  onDelete: (messageId?: number, createdAt?: Date) => void;
  handleReplyMessage: (message: MessageCopyItemProps) => void;
  replyMessage?: MessageCopyItemProps;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  id,
  text,
  senderName,
  createdAt,
  isAuthor,
  onDelete,
  handleReplyMessage,
  replyMessage,
}) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="ContextMenuTrigger">
        <Flex
          className={`${
            isAuthor ? "bg-cyan-200/40" : "bg-cyan-500/40"
          } rounded-md m-3 ${isAuthor ? "self-end" : "self-start"}`}
          justify="between"
        >
          <Flex direction="column" className="p-3">
            <MessageCopy isInInput={false} {...replyMessage} />
            <Text className="text-xs text-gray-400 font-bold">
              {isAuthor ? "" : senderName}
            </Text>
            <Text>{text}</Text>
          </Flex>
          <Text className="flex space-between text-xs self-end pr-2 pb-1 font-bold text-gray-400">
            {formatDateToTime(createdAt)}
          </Text>
        </Flex>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="rounded-md min-h-[50] min-w-[100] bg-cyan-700/40 cursor-pointer outline-none">
          <ContextMenu.Item
            onClick={() => onDelete(id, createdAt)}
            className="bg-cyan-700/40 rounded-md text-red-100 p-2 outline-none hover:bg-cyan-300/40"
          >
            Remove
          </ContextMenu.Item>
          <ContextMenu.Item
            className="bg-cyan-700/40 rounded-md text-red-100 p-2 outline-none hover:bg-cyan-300/40"
            onClick={() =>
              handleReplyMessage({ id, text, senderName, createdAt })
            }
          >
            Reply
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
