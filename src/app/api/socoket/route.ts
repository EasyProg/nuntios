// app/api/socket/route.js
import { createServer } from "http";
import { NextResponse } from "next/server";
import { Server } from "socket.io";

declare global {
  var io: Server | undefined;
}

export async function GET() {
  if (!global.io) {
    // const { Server } = require("socket.io");

    const httpServer = createServer();
    global.io = new Server(httpServer, {
      cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    httpServer.listen(3001, () => {
      console.log("Socket.IO server running on port 3001");
    });

    global.io?.on("connection", (socket) => {
      socket.on("join-room", (roomId) => {
        socket.join(roomId);
      });

      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
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
