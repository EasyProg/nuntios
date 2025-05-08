import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var prisma: PrismaClient;
}

const client =
  globalThis.prisma ??
  new PrismaClient({
    errorFormat: "pretty",
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
