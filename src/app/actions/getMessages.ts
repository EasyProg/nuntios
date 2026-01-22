import { decryptMessage } from "@/helpers/helpers";
import prisma from "./prisma";

export const getMessages = async (id: string, password?: string | null) => {
  const chat = await prisma.chat.findFirst({
    where: {
      chatId: id,
    },
  });

  try {
    const messages = await prisma.message.findMany({
      cacheStrategy: {
        ttl: 15,
      },
      orderBy: {
        createdAt: "asc",
      },
      where: {
        chatId: chat?.id,
      },
      include: {
        sendUser: true,
        replyMessage: true,
      },
    });
    return messages.map((item) => ({
      ...item,
      text: password ? decryptMessage(item.text, password) : "",
      replyMessage:
        item.replyMessage && password
          ? {
              ...item.replyMessage,
              text: decryptMessage(item.replyMessage.text, password),
            }
          : null,
    }));
  } catch (error: any) {
    throw error;
  }
};

export default getMessages;
