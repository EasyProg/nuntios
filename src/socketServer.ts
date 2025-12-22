import axios from "axios";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const localHost = "http://localhost:3000";

type GlobalType = { io?: Server };

const server = createServer();
const serverIo = new Server(server, {
  cors: {
    origin: localHost, // Next js url
    methods: ["GET", "POST"],
  },
});

(global as GlobalType).io = serverIo;

serverIo.on("connection", (socket: Socket) => {
  console.log("New connection:", socket.id);
  socket.emit("message", "Привет от сервера!");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("update-chat-message", async (data) => {
    const { chatId, message } = data;
    (global as GlobalType).io?.emit("update-chat-message", {
      message,
      chatId,
    });
  });

  socket.on("send-message", async (data) => {
    const { chatId, message, dbId, encodePassword } = data;
    // Save data to BD than send to all in group
    // Send to everyone in group

    try {
      await axios.post(`${localHost}/api/message`, {
        message,
        dbId,
        encodePassword,
      });
      // set item to storage get full fallback return
      (global as GlobalType).io?.to(chatId).emit("receive-message", message);
      (global as GlobalType).io?.emit("update-chat-message", {
        message,
        chatId,
      });
    } catch (error: unknown) {
      console.error("API call failed:", error);

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
