"use client";

import Link from "next/link";
import { ContextMenu } from "radix-ui";
import { useEffect } from "react";
import { ChatUpdateDialog } from "../layout/createChat/ChatUpdateDialog";
import { chatItem, chatItemActive } from "../ui/consts";
import ConfirmationDialog from "../ui/dialog/ConfirmationDialog";

type ChatProps = {
  name: string;
  lastMessage: string | null;
  lastMessageAt: string;
  chatId: string;
  isActive: boolean;
  dbId: number;
  onDelete: (chatId: number) => void;
  encodePassword: string | null;
};

export const ChatItem: React.FC<ChatProps> = ({
  name,
  lastMessageAt,
  lastMessage,
  chatId,
  isActive,
  onDelete,
  dbId,
  encodePassword,
}) => {
  useEffect(() => {
    sessionStorage.setItem(
      "chat_data",
      JSON.stringify({ dbId, encodePassword }),
    );
  }, []);

  const handleClick = () => {
    sessionStorage.setItem(
      "chat_data",
      JSON.stringify({ dbId, encodePassword }),
    );
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Link
          className="contents! !outline-none flex h-full flex-col justify-between min-h-14 overflow-hidden"
          passHref
          href={`/chat/${chatId}/`}
          onClick={handleClick}
          shallow={true}
        >
          <div className={isActive ? chatItemActive : chatItem}>
            <div className="mb-2 text-sm text-ellipsis max-w-[200px]">
              {name}
            </div>
            <div className="mb-1 overflow-hidden max-h-[50px] max-w-[200px]">
              {lastMessage}
            </div>
            <div className="flex justify-end items-end text-[8px]">
              {lastMessage && lastMessageAt}
            </div>
          </div>
        </Link>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="rounded-md min-h-[50] min-w-[100] bg-cyan-700/40 cursor-pointer outline-none">
          <ChatUpdateDialog
            name={name}
            chatId={chatId}
            dbId={dbId}
            trigger={
              <ContextMenu.Item
                className="text-left bg-cyan-700/40 rounded-md text-red-100 p-2 outline-none hover:bg-cyan-300/40"
                onSelect={(e) => e.preventDefault()}
              >
                Edit
              </ContextMenu.Item>
            }
          />
          <ConfirmationDialog
            headerText="Leave chat"
            description="Do you really want to leave this chat?"
            confirmationText="Yes"
            declineText="No"
            onAction={onDelete}
            trigger={
              <ContextMenu.Item
                className="bg-cyan-700/40 rounded-md text-red-100 p-2 outline-none hover:bg-cyan-300/40"
                onSelect={(e) => e.preventDefault()}
              >
                Remove
              </ContextMenu.Item>
            }
            actionParam={dbId}
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
