import { getCurrentUser } from "@/helpers/auth";
import prisma from "./prisma";

export const getChats = async () => {
  let user = null;
  const userData = await getCurrentUser();
  if (userData?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: userData?.email as string,
      },
    });
  }
  if (user)
    try {
      const chats = await prisma.chat.findMany({
        orderBy: {
          lastMessageAt: "desc",
        },
        where: {
          users: {
            some: {
              id: user.id,
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
