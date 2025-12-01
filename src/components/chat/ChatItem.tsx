"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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
};

export const ChatItem: React.FC<ChatProps> = ({
  name,
  lastMessageAt,
  lastMessage,
  chatId,
  isActive,
  onDelete,
  dbId,
}) => (
  <div className={isActive ? chatItemActive : chatItem}>
    <Link
      className="!outline-none flex h-full flex-col justify-between min-h-14  "
      href={`/chat/${chatId}/`}
      shallow={true}
    >
      <div className="mb-2">{name}</div>
      <div className="mb-1">{lastMessage}</div>
      <div className="flex justify-between items-end text-[8px]">
        {lastMessageAt}
        <ConfirmationDialog
          headerText="Leave chat"
          description="Do you really want to leave this chat?"
          confirmationText="Yes"
          declineText="No"
          trigger={<TrashIcon />}
          onAction={onDelete}
          actionParam={dbId}
        />
      </div>
    </Link>
  </div>
);
