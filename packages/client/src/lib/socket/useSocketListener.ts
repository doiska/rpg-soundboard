'use client'

import {useEffect, useRef} from "react";
import {initializeSocket} from "@/lib/socket/client";

export function useSocketSender() {
    const socket = useRef(initializeSocket());

    return socket.current;
}

export function useSocketListener(event: string, callback: (...args: any[]) => void) {
    const socket = useRef(initializeSocket());

    useEffect(() => {
        socket.current.on(event, callback);

        return () => {
            socket.current.off(event, callback);
        };
    }, [event, callback]);
}