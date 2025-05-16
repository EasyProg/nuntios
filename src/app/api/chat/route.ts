import { UserDataType } from "@/components/types";
import { getCurrentUser } from "@/helpers/auth";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const userData: UserDataType = await getCurrentUser();
    const body = await request.json();
    const { name, users } = body;

    if (!users || !name) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: userData?.email,
      },
    });

    const uniqId = uuidv4();

    if (currentUser) {
      const chat = await prisma.chat.create({
        data: {
          name,
          chatId: uniqId,
          users: {
            connect: [
              ...users.map((item: User) => ({ id: item.id })),
              { id: currentUser.id },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(chat);
    }
  } catch (error: any) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  } finally {
    revalidateTag(`chat`);
    redirect("/chat");
  }
}
