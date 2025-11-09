import axios from "axios";
import { createServer } from "http";
// import { RedirectType, redirect } from "next/navigation";
import { Server, Socket } from "socket.io";
// import nextConfig from "../next.config";

const localHost = "http://localhost:3000";

const server = createServer();
const serverIo = new Server(server, {
  cors: {
    origin: localHost, // Next js url
    methods: ["GET", "POST"],
  },
});

global.io = serverIo;

serverIo.on("connection", (socket: Socket) => {
  console.log("New connection:", socket.id);
  socket.emit("message", "Привет от сервера!");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", async (data) => {
    const { chatId, message } = data;
    // Save data to BD than send to all in group
    // Send to everyone in group

    try {
      await axios.post(`${localHost}/api/message`, {
        message,
        chatId,
      });
      global.io?.to(chatId).emit("receive-message", message);
    } catch (error: unknown) {
      console.error("API call failed:", error);

      // Отправка ошибки клиенту
      socket.emit("apiResponse", {
        status: "error",
        message: error,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO сервер запущен на http://localhost:${PORT}`);
});
