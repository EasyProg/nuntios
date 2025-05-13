import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./helpers/auth-client";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  // const token = await getAuthToken();
  const isValid = verifyToken(token || "");

  if (!isValid) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/chat", request.url));
  }
  // NextResponse.error;
  return NextResponse.next();
}

// Config for routes
export const config = {
  matcher: ["/chat", "/"],
};
