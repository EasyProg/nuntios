import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user");
  console.log(user);

  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  // NextResponse.error;
  return NextResponse.next();
}

// Конфигурация для каких маршрутов применять middleware
export const config = {
  matcher: ["/chat", "/"],
};
