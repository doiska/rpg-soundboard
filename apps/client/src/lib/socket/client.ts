'use client'

import {io, Socket} from "socket.io-client";

let socket: Socket;

export function initializeSocket(): Socket {
    if (!socket) {
        socket = io("http://localhost:3005");
    }
    return socket;
}
