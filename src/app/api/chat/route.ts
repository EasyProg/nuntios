import prisma from "@/app/actions/prisma";
import { UserDataType } from "@/components/types";
import { getCurrentUser } from "@/helpers/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userData: UserDataType = await getCurrentUser();
    const body = await request.json();
    const { name, users, chatId } = body;

    if (!users || !name) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: userData?.email,
      },
    });
    if (currentUser) {
      const chat = await prisma.chat.create({
        data: {
          name,
          chatId,
          users: {
            connect: [...users, { id: currentUser.id }],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(chat);
    }
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  } finally {
    revalidateTag(`chat`);
    redirect("/chat");
  }
}
