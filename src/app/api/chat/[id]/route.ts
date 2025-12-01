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
