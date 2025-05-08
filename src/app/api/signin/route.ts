import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../../actions/prisma";

export async function POST(request: Request) {
  try {
    const coookieStore = await cookies();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (currentUser) {
      coookieStore.set("user", email, {
        path: "/",
        maxAge: 60 * 60,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() * 1000 * 10),
      });
      return NextResponse.json(currentUser);
    }
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
