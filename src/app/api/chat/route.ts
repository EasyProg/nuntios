import getChats from "@/app/actions/getChats";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../actions/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = request.cookies.get("user");
    const body = await request.json();
    const { name, users } = body;

    if (!users || !name) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: user,
      },
    });

    if (currentUser) {
      const chat = await prisma.chat.create({
        data: {
          name,
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

      getChats(email);
      return NextResponse.json(chat);
    }
    // return user;
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
