import { cookies } from "next/headers";
import prisma from "./prisma";

export const getChats = async () => {
  const coookieStore = await cookies();
  const userMail = coookieStore.get("user")?.value;

  const user = await prisma.user.findUnique({
    where: {
      email: userMail,
    },
  });

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
