import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const coookieStore = await cookies();
    coookieStore.delete("auth-token");
    return new NextResponse("Logged out", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
