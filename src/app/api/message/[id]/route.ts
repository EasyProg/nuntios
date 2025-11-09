import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../actions/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date } = body;
    const res = id
      ? await prisma.message.delete({ where: { id } })
      : await prisma.message.deleteMany({
          where: { createdAt: { equals: date } },
        });
    // revalidatePath(`/chat/${chatId}`);
    return NextResponse.json(res);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
