import { getCurrentUser } from "@/helpers/auth";
import prisma from "./prisma";

const getUsers = async () => {
  const userData = await getCurrentUser();
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: { equals: Number(userData?.id) },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error: any) {
    // return new NextResponse("Internal Error", { status: 500 });
    throw error;
  }
};

export { getUsers };
