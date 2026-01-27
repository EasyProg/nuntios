"use client";

import { formatDateToTime } from "@/helpers/helpers";
import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { MessageCopyItemProps } from "../types";
import { LinkifyText } from "../ui/LinkifyText";

export const MessageCopy: React.FC<
  MessageCopyItemProps & { isInInput?: boolean; onClearReply?: () => void }
> = ({ text, senderName, createdAt, isInInput = true, onClearReply }) => {
  return text ? (
    <Flex
      className={`${
        isInInput ? "bg-gray-800" : "bg-cyan-700"
      } rounded-xs p-1 w-fit overflow-auto`}
      justify="between"
      direction="column"
    >
      <Flex direction="column">
        <div className="flex w-[100%] justify-between">
          <Image
            width={15}
            height={15}
            priority
            src="/commaleft.svg"
            alt="som text"
            className="self-start"
          />
          {isInInput ? (
            <div className="cursor-pointer" onClick={onClearReply}>
              x
            </div>
          ) : null}
        </div>
        <Flex direction="column" className="pl-2">
          <Text className="text-xs text-gray-400 font-bold text-start">
            {senderName}
          </Text>
          <LinkifyText text={text} className="wrap-anywhere text-start" />
        </Flex>
      </Flex>
      <Flex justify="end">
        <Text className="flex space-between text-xs self-end pr-2 pb-1 font-bold text-gray-400 pr-1">
          {formatDateToTime(createdAt)}
        </Text>
        <Image
          width={15}
          height={15}
          priority
          src="/commaright.svg"
          alt="som text"
          className="self-end"
        />
      </Flex>
    </Flex>
  ) : null;
};
