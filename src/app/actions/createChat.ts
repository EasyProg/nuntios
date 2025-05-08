// "use client";

// import { User } from "@prisma/client";
// import { NextResponse } from "next/server";
// import prisma from "./prisma";

// // here is creator of chat within the other users

// export const createChat = async (name: string, members: any) => {
//   try {
//     const chat = await prisma.chat.create({
//       data: {
//         users: {
//           connect: [
//             ...members.map((item: User) => ({ id: item.id })),
//             { id: 2 },
//           ],
//         },
//         name,
//       },
//       include: {
//         users: true,
//       },
//     });
//     return chat;
//   } catch (error) {
//     return new NextResponse("Error", { status: 400 });
//   }
// };
