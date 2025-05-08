import prisma from "./prisma";

export const getChats = async (userId: number) => {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sendUser: true,
          },
        },
      },
    });

    return chats;
  } catch (error: any) {
    console.log({ error });
    throw error;
  }
};

export default getChats;
