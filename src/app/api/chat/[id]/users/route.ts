import { getCurrentUser } from "@/helpers/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../actions/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const userData = await getCurrentUser();
    const res = await prisma.user.findMany({
      where: {
        chats: { some: { chatId: id } },
        NOT: {
          id: { equals: Number(userData?.id) },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}
