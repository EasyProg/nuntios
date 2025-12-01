import { Chats } from "@/components/types";
import { Chat } from "@prisma/client";

const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  return regex.test(password);
};
const formattedDate = (createdAt?: string | Date) => {
  if (!createdAt) return "";
  console.log({ createdAt });
  return createdAt instanceof Date
    ? createdAt?.toTimeString().substring(0, 9)
    : createdAt.substring(11, 19);
};

const modifyChats = (chatsInput: Chat[]): Chats =>
  chatsInput.map((item) => {
    const now = Date.now();
    const isMoreOneDay =
      (now - item.lastMessageAt.getTime()) / (1000 * 60 * 60) > 24;
    return {
      ...item,
      lastMessageAt: isMoreOneDay
        ? item.lastMessageAt.toLocaleDateString()
        : item.lastMessageAt.toLocaleTimeString(),
    };
  });
export { validatePassword, formattedDate, modifyChats };
