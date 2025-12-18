import { ChatsLocalized } from "@/components/types";
import { Chat } from "@prisma/client";

const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  return regex.test(password);
};
const formatDateToTime = (createdAt?: Date) =>
  createdAt?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const modifyDate = (date: Date): string => {
  const now = Date.now();
  const timeSymbols = 9;
  const isMoreOneDay = new Date(now).getDate() !== date.getDate();
  return isMoreOneDay
    ? date.toString().substring(0, date.toString().indexOf("GMT") - timeSymbols)
    : date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
};

const modifyDateFromString = (dateInput: string): string => {
  const now = new Date().getTime();
  const date = new Date(dateInput);
  const diffHours = (now - date.getTime()) / (1000 * 60 * 60);
  const isMoreOneDay =
    diffHours > 24 ||
    (diffHours < 24 && date.getDay() !== new Date(now).getDay());
  return isMoreOneDay ? date.toLocaleDateString() : date.toLocaleTimeString();
};

const modifyChats = (chatsInput: Chat[]): ChatsLocalized =>
  chatsInput.map((item) => {
    return {
      ...item,
      lastMessageAtLocalized: modifyDate(item.lastMessageAt),
    };
  });

const isDate = (value: unknown): value is Date => {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
};

import { User } from "@prisma/client";

export const mapUsersOption = (users: User[]) =>
  users.map((user) => ({ value: user.id, label: user.name }));

export {
  validatePassword,
  formatDateToTime,
  modifyDateFromString,
  modifyDate,
  modifyChats,
  isDate,
};
