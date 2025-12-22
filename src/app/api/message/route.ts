import { encryptMessage } from "@/helpers/helpers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../actions/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, dbId, encodePassword } = body;
    const { text, createdAt, sendUserId, replyMessage } = message;
    const encrypted = encryptMessage(text, encodePassword);
    const res = await prisma.message.create({
      data: {
        text: encrypted,
        createdAt,
        chatId: dbId,
        senderId: Number(sendUserId),
        replyId: replyMessage?.id,
      },
    });
    await prisma.chat.update({
      where: {
        id: dbId,
      },
      data: {
        lastMessageAt: createdAt,
        lastMessage: text,
      },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}
