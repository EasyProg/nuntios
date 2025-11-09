import { createChat } from "@/app/actions/createChat";
import { Chat, User } from "@prisma/client";

export type CreateChatProps = {
  createChat: typeof createChat;
};

export type UsersProps = {
  users: User[];
};

export type Chats = (Omit<Chat, "lastMessageAt"> & { lastMessageAt: string })[];

export type UserDataType = {
  id?: string;
  email?: string;
  name?: string;
  iat?: number;
  exp?: number;
} | null;
