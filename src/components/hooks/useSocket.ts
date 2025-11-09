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
    const socketInstance = io("http://localhost:3001");

    setSocket(socketInstance as any);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
}
