"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Message, User } from "@prisma/client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from "react-virtualized";
import { useVirtualScroll } from "../hooks/useVirtualScroll";
import { MessageCopyItemProps } from "../types";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: Partial<
    Message & {
      sendUser: User;
      replyMessage: Message;
      sendUserId?: string;
      senderName?: string;
    }
  >[];
  chatId: string;
  handleDelete: () => void;
  handleReplyMessage: (message: MessageCopyItemProps) => void;
  handleResendMessage: (message: MessageCopyItemProps) => void;
};

export const MessageBox: React.FC<MessageListProps> = ({
  messages,
  handleDelete,
  handleReplyMessage,
  handleResendMessage,
}) => {
  const { user } = useAuth();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollIndex, setScrollIndex] = useState<number>();
  const [openedMessageId, setIsOpenedMessageId] = useState<null | number>(null);
  const { listRef, isAtBottom, scrollToBottom, handleScroll, setIsAtBottom } =
    useVirtualScroll();

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 70,
      minHeight: 50,
    }),
  );

  const rowRenderer = useCallback(
    ({
      index,
      key,
      parent,
      style,
    }: {
      index: number;
      key: string;
      parent: any;
      style: React.CSSProperties;
    }) => {
      const message = messages[index];

      if (!message) return null;

      const sendUser = message.sendUser;
      const senderName = sendUser ? sendUser?.name : message?.senderName;
      const sendUserId = sendUser ? sendUser.id : message?.sendUserId;
      const isAuthor = Number(user?.id) === Number(sendUserId);

      return (
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          {({ registerChild, measure }) => (
            <div
              // ref={registerChild}
              style={style}
              className={`px-2 py-1 flex ${
                isAuthor ? "justify-end" : "justify-start"
              }`}
              onLoad={measure}
            >
              <MessageItem
                id={message.id || -1}
                isOpen={message.id === openedMessageId}
                text={message.text}
                onDelete={handleDelete}
                createdAt={message.createdAt}
                isAuthor={isAuthor}
                senderName={senderName}
                key={`${message.id}${index}`}
                handleReplyMessage={handleReplyMessage}
                handleResendMessage={handleResendMessage}
                replyMessage={message.replyMessage}
                setIsOpenMessageId={setIsOpenedMessageId}
                onContentUpdate={measure}
              />
            </div>
          )}
        </CellMeasurer>
      );
    },
    [messages, user, openedMessageId, handleDelete, handleReplyMessage],
  );

  const handleScrollToBottom = useCallback(async () => {
    setIsScrolling(true);
    scrollToBottom();
    setIsScrolling(false);
  }, [setScrollIndex]);

  const scrollToBottomButton = useMemo(() => {
    if (isAtBottom || messages.length <= 10) return null;
    return (
      <IconButton
        radius="full"
        variant="soft"
        className={`
          !cursor-pointer hover:bg-cyan-700!
          !fixed !bottom-45 !right-4
          !self-end !rounded-full
          !bg-cyan-800 !p-2
          transition-all duration-300 z-50
          !bottom-[120px]
          ${
            isScrolling
              ? "animate-pulse scale-95"
              : "animate-bounce hover:scale-110"
          }
        `}
        onClick={handleScrollToBottom}
      >
        <ArrowDownIcon
          className={`transition-transform duration-300 ${
            isScrolling ? "rotate-180" : ""
          }`}
          width="20"
          height="20"
        />
      </IconButton>
    );
  }, [isAtBottom, messages.length, isScrolling]);

  useEffect(() => {
    setScrollIndex(messages.length - 1);
    setIsAtBottom(true);
  }, [messages]);

  return (
    <div className="h-full w-full">
      <AutoSizer onResize={() => cache.current.clearAll()}>
        {({ width, height }) => (
          <List
            ref={listRef}
            estimatedRowSize={12}
            width={width}
            height={height}
            rowCount={messages.length}
            rowHeight={cache.current.rowHeight}
            rowRenderer={rowRenderer}
            deferredMeasurementCache={cache.current}
            overscanRowCount={12}
            onScroll={({ scrollTop, scrollHeight }) => {
              handleScroll({ scrollTop, scrollHeight });
              setScrollIndex(undefined);
            }}
            scroll
            scrollToAlignment="end"
            scrollToIndex={scrollIndex}
            className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          />
        )}
      </AutoSizer>
      {scrollToBottomButton}
    </div>
  );
};
