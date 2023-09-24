"use client";

import { useEffect, useRef } from "react";
import { initializeSocket } from "@/lib/socket/client";

export function useSocketSender() {
  const socket = useRef(initializeSocket());
  return socket.current;
}

export function useSocketListener(event: string, callback: () => void) {
  const socket = useRef(initializeSocket());

  useEffect(() => {
    const current = socket.current;
    current.on(event, callback);

    return () => {
      current.off(event, callback);
    };
  }, [event, callback]);
}
