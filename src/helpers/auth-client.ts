// import jwt from "jsonwebtoken";

import { UserDataType } from "@/components/types";
import { SignJWT, jwtVerify } from "jose";

// Создание токена
const token = await new SignJWT({ userId: 123 })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode("secret"));

// Верификация токена
const { payload } = await jwtVerify(token, new TextEncoder().encode("secret"));

type UserPayload = {
  id: string;
  email: string;
  name: string;
};

const JWT_SECRET = process.env.JWT_SECRET!;

export async function generateToken(payload: UserPayload): Promise<string> {
  // return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(JWT_SECRET));
}

export async function verifyToken(token: string): Promise<UserDataType> {
  try {
    const { payload } = await jwtVerify<Partial<UserDataType>>(
      token,
      new TextEncoder().encode(JWT_SECRET),
    );
    return payload;
    // return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
}
