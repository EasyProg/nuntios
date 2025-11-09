import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

type AcceleratedPrismaClient = ReturnType<typeof getAcceleratedPrismaClient>;

function getAcceleratedPrismaClient() {
  return new PrismaClient({
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
}

const prismaClientSingleton = (): AcceleratedPrismaClient => {
  return getAcceleratedPrismaClient();
};

// type AcceleratedPrismaClient = typeof client;
declare global {
  var prisma: AcceleratedPrismaClient;
}

const prisma: AcceleratedPrismaClient =
  globalThis.prisma ?? prismaClientSingleton();

export default prisma;
