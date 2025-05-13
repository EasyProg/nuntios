"use client";

import Link from "next/link";
import { chatItemClass } from "../ui/consts";

type ChatProps = {
  name: string;
  lastMessageAt: string;
  chatId: string;
};

export const ChatItem: React.FC<ChatProps> = ({
  name,
  lastMessageAt,
  chatId,
}) => {
  return (
    <div className={chatItemClass}>
      <Link href={`/chat/${chatId}`} shallow={true}>
        <div className="mb-2">{name}</div>
        <div>{lastMessageAt}</div>
      </Link>
    </div>
  );
};
