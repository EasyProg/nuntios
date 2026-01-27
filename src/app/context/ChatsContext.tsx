"use client";

import { MessageCopyItemProps } from "@/components/types";
import { Chat } from "@prisma/client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type MessageType = MessageCopyItemProps | null;

type ChatsContextType = {
  updateChats: (chats: Chat[]) => void;
  chats: Chat[];
  redirectedMessage: MessageType;
  updateMessage: (message: MessageType) => void;
};

const ChatsContext = createContext<ChatsContextType>({
  updateChats: () => false,
  chats: [],
  redirectedMessage: null,
  updateMessage: () => false,
});

export const ChatsProvider: FC<PropsWithChildren<{ initialChats: Chat[] }>> = ({
  children,
  initialChats,
}) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [redirectedMessage, setRedirectedMessage] = useState<MessageType>(null);

  const updateChats = (nextChats: Chat[]) => {
    setChats(nextChats);
  };

  const updateMessage = (message: MessageType) => {
    setRedirectedMessage(message);
  };

  return (
    <ChatsContext.Provider
      value={{ chats, updateChats, updateMessage, redirectedMessage }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => useContext(ChatsContext);
