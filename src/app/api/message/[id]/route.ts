import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../actions/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, message, chatId } = body;
    const chat = await prisma.chat.findFirst({
      cacheStrategy: {
        ttl: 60,
      },
      where: { chatId },
    });
    const res = id
      ? await prisma.message.delete({ where: { id } })
      : await prisma.message.deleteMany({
          where: { createdAt: { equals: date } },
        });
    await prisma.chat.update({
      where: { id: chat?.id },
      data: {
        lastMessageAt: message ? message.createdAt : new Date(),
        lastMessage: message ? message.text : "",
      },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
