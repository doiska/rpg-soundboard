"use client"

import { getSession } from "next-auth/react"
import { io, Socket } from "socket.io-client"

let socket: Socket

export function initializeSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:3005", {
      auth: (cb) => {
        getSession().then((session) => {
          cb({
            token: session?.user?.name,
          })
        })
      },
    })
  }
  return socket
}
