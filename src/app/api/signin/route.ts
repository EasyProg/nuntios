import { setAuthCookie } from "@/helpers/auth";
import { generateToken } from "@/helpers/auth-client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "../../actions/prisma";

export async function POST(request: Request) {
  try {
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
      const isValid = await bcrypt.compare(password, currentUser.password);
      if (!isValid) {
        return new NextResponse("Wrong credentials", { status: 401 });
      }
      const token = await generateToken({
        id: currentUser.id.toString(),
        name: currentUser.name || "",
        email: currentUser.email,
      });

      await setAuthCookie(token);
      return NextResponse.json(token);
    } else return new NextResponse("No such user", { status: 403 });
  } catch (error: any) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}
