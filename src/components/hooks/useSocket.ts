// hooks/useSocket.js
"use client";

import { getAuthToken } from "@/helpers/auth";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket(): Socket | null {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialization
    const token = getAuthToken();
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
      { auth: token },
    );

    setSocket(socketInstance as any);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
}
