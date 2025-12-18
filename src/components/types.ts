import { Chat, User } from "@prisma/client";

export type ChatWithUsers = (Chat & { users: User[] }) | null;

export type ChatWithLocale = Chat & { lastMessageAtLocalized: string };
export type ChatsLocalized = ChatWithLocale[];

export type UsersProps = {
  users: User[];
};

export type UserDataType = {
  id?: string;
  email?: string;
  name?: string;
  iat?: number;
  exp?: number;
} | null;

export type MessageCopyItemProps = {
  id?: number;
  text?: string;
  createdAt?: Date;
  senderName?: string | null;
};
