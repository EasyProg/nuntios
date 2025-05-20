"use client";

import Link from "next/link";
import { chatItemClass, chatItemClassActive } from "../ui/consts";

type ChatProps = {
  name: string;
  lastMessageAt: string;
  chatId: string;
  isActive: boolean;
};

export const ChatItem: React.FC<ChatProps> = ({
  name,
  lastMessageAt,
  chatId,
  isActive,
}) => {
  return (
    <div className={isActive ? chatItemClassActive : chatItemClass}>
      <Link href={`/chat/${chatId}`} shallow={true}>
        <div className="mb-2">{name}</div>
        <div>{lastMessageAt}</div>
      </Link>
    </div>
  );
};
