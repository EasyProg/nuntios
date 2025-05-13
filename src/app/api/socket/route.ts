// app/api/socket/route.js
import { NextResponse } from "next/server";
import { Server } from "socket.io";

declare global {
  var io: Server | undefined;
}

export async function GET() {
  if (!global.io) {
    const { createServer } = require("http");
    const { Server } = require("socket.io");

    const httpServer = createServer();
    global.io = new Server(httpServer);

    httpServer.listen(3001, () => {
      console.log("Socket.IO server running on port 3001");
    });

    global.io?.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("join-room", (roomId) => {
        socket.join(roomId);
      });

      socket.on("send-message", (data) => {
        // Сохраняем сообщение в БД
        // Затем рассылаем всем в комнате
        global.io?.to(data.roomId).emit("receive-message", data.message);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  return NextResponse.json({ success: true });
}
