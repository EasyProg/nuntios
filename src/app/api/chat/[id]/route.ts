import { UserDataType } from "@/components/types";
import { getCurrentUser } from "@/helpers/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../actions/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, userId } = body;

    const res = await prisma.chat.update({
      where: { id },
      data: { users: { disconnect: { id: Number(userId) } } },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const userData: UserDataType = await getCurrentUser();
    const { users, name, id } = body;
    if (!users || !name) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: userData?.email,
      },
    });
    if (currentUser) {
      const res = await prisma.chat.update({
        where: { id },
        data: {
          name,
          users: {
            connect: [...users, { id: currentUser.id }],
          },
        },
      });
      return NextResponse.json(res);
    }
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
