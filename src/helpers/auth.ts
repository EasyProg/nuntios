"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "./auth-client";

const TOKEN_NAME = "auth-token";

export async function setAuthCookie(token: string) {
  const cookiesStore = await cookies();
  cookiesStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "strict",
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookiesStore = await cookies();
  return cookiesStore.get(TOKEN_NAME)?.value || null;
}

export async function clearAuthCookie() {
  const cookiesStore = await cookies();
  cookiesStore.delete(TOKEN_NAME);
}

export async function getCurrentUser() {
  const token = await getAuthToken();
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
