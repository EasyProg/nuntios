import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const coookieStore = await cookies();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const checkUser = await prisma.user.findUnique({ where: { email } });

    if (checkUser) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        // password
      },
    });

    if (user) {
      coookieStore.set("user", email, {
        path: "/",
        maxAge: 60 * 60,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() * 1000 * 10),
      });
      return NextResponse.json(user);
    }

    redirect("/chat");
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
