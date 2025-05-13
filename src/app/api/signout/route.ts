import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const coookieStore = await cookies();
    coookieStore.delete("user");
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  } finally {
    console.log("finally");
    redirect("/signin");
  }
}
