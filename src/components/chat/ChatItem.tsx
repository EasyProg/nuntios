"use client";

type ChatProps = {
  name: string;
  lastMessageAt: string;
};

export const ChatItem: React.FC<ChatProps> = ({ name, lastMessageAt }) => {
  return (
    <div className="flex">
      <div>{name}</div>
      <div>{lastMessageAt}</div>
    </div>
  );
};
