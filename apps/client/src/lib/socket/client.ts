"use client"

import { getSession } from "next-auth/react"
import { io, Socket } from "socket.io-client"

let socket: Socket

export function initializeSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:3005", {
      auth: (cb) => {
        getSession().then((session) => {
          console.log(session)
          cb({
            token: session?.user?.name,
          })
        })
      },
    })

    const handleErrors = (err: unknown) => {
      console.error(err)
    }

    console.log("Connecting socket...")
    socket.on("update", (data) => console.log(data))

    //TODO: handle it
    socket.on("connect_error", (err) =>
      handleErrors(`connect_error due to ${err.message}`)
    )

    socket.on("connect_failed", (err) => handleErrors(err))
    socket.on("disconnect", (err) => handleErrors(err))
  }
  return socket
}
