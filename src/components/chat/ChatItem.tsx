"use client";

import Link from "next/link";
import { chatItem, chatItemActive } from "../ui/consts";

type ChatProps = {
  name: string;
  lastMessageAt: string;
  chatId: string;
  isActive: boolean;
  dbId: number;
};

export const ChatItem: React.FC<ChatProps> = ({
  name,
  lastMessageAt,
  chatId,
  isActive,
}) => (
  <div className={isActive ? chatItemActive : chatItem}>
    <Link
      className="!outline-none"
      // href={`/chat/${chatId}`}
      href={`/chat/${chatId}/`}
      shallow={true}
    >
      <div className="mb-2">{name}</div>
      <div>{lastMessageAt}</div>
    </Link>
  </div>
);
