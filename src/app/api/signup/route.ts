import { validatePassword } from "@/helpers/helpers";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "../../actions/prisma";

export async function POST(request: Request) {
  try {
    // const coookieStore = await cookies();
    const body = await request.json();
    const { email, password, name } = body;

    if (!validatePassword) {
      return new NextResponse("Invalid password", { status: 403 });
    }

    const passwordDecoded = bcrypt.hashSync(password, 8);

    const checkUser = await prisma.user.findUnique({ where: { email } });

    if (checkUser) {
      return new NextResponse("User already exists", { status: 409 });
    }

    await prisma.user.create({
      data: {
        email,
        name,
        password: passwordDecoded,
      },
    });
  } catch (error: any) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}
