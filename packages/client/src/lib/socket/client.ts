'use client'

import {io, Socket} from "socket.io-client";

let socket: Socket;

export function initializeSocket(): Socket {
    if (!socket) {
        socket = io("http://localhost:3001");

        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
    }
    return socket;
}