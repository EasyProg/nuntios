import { Prisma } from "@prisma/client";
import prisma from "./prisma";

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error: any) {
    // return new NextResponse("Internal Error", { status: 500 });
    console.log({ error });
    throw error;
  }
};

export { getUsers };
