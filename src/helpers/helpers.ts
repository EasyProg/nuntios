import { ChatsLocalized } from "@/components/types";
import { Chat, User } from "@prisma/client";
import CryptoJS from "crypto-js";

const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  return regex.test(password);
};

const formatDateToTime = (createdAt?: Date) => {
  const createdAtInput =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  return createdAtInput?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const modifyDate = (date: Date | string): string => {
  const now = Date.now();
  const timeSymbols = 9;
  const inputDate = typeof date === "string" ? new Date(date) : date;
  const isMoreOneDay = new Date(now).getDate() !== inputDate.getDate();
  return isMoreOneDay
    ? inputDate
        .toString()
        .substring(0, inputDate.toString().indexOf("GMT") - timeSymbols)
    : inputDate.toLocaleTimeString([], {
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

export const mapUsersOption = (users: User[]) =>
  users.map((user) => ({ value: user.id, label: user.name }));

/**
 * Encrypt message using AES
 * @param {string} message - Message to encrypt
 * @param {string} password - Password/key for encryption
 * @returns {string} Encrypted string in Base64 format
 */
const encryptMessage = (message: string, password: string) => {
  try {
    // const password = window.localStorage.get("encryption_password");
    return CryptoJS.AES.encrypt(message, password).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt message");
  }
};

/**
 * Decrypt message using AES
 * @param {string} encryptedMessage - Encrypted message in Base64 format
 * @param {string} password - Password/key for decryption
 * @returns {string} Decrypted message
 */
const decryptMessage = (encryptedMessage: string, password: string) => {
  try {
    // const password = window.localStorage.get("encryption_password");
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error("Invalid password or corrupted data");
    }

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt message");
  }
};

/**
 * Generate random password
 * @param {number} length - Password length (default: 32)
 * @returns {string} Random password
 */
const getPasswordKey = (length = 32) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
  let password = "";

  // Use Web Crypto API for cryptographically secure generation
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }

  localStorage.setItem("encryption_password", password);

  return password;
};

export {
  validatePassword,
  formatDateToTime,
  modifyDateFromString,
  modifyDate,
  modifyChats,
  isDate,
  encryptMessage,
  decryptMessage,
  getPasswordKey,
};
