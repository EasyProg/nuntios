import prisma from "./prisma";

export const getMessages = async (id: string) => {
  const chat = await prisma.chat.findFirst({
    where: {
      chatId: id,
    },
  });

  try {
    const messages = await prisma.message.findMany({
      cacheStrategy: {
        ttl: 60,
      },
      orderBy: {
        createdAt: "asc",
      },
      where: {
        chatId: chat?.id,
      },
      include: {
        sendUser: true,
      },
    });
    return messages;
  } catch (error: any) {
    throw error;
  }
};

export default getMessages;
