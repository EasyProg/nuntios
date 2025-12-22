import prisma from "./prisma";

const getChat = async (chatId: string) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        chatId,
      },
    });
    return chat;
  } catch (error: any) {
    throw error;
  }
};

export { getChat };
