import { NextRequest, NextResponse } from "next/server";
import prisma from "../../actions/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, chatId } = body;
    const { name, createdAt, sendUserId } = message;
    const chat = await prisma.chat.findFirst({
      cacheStrategy: {
        ttl: 60,
      },
      where: { chatId },
    });
    const res = await prisma.message.create({
      data: {
        name,
        createdAt,
        chatId: Number(chat?.id),
        senderId: Number(sendUserId),
      },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}
