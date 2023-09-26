"use client"

import { useEffect, useRef, useState } from "react"

import { initializeSocket } from "@/lib/socket/client"

export function useChat() {
  const socket = useRef(initializeSocket())
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    const currSocket = socket.current

    currSocket.on("chat", (e) => {
      setMessages((messages) => [...messages, e])
    })

    return () => {
      currSocket.off("chat")
    }
  }, [socket])

  return { messages }
}

export function useChatSender() {
  const socket = useRef(initializeSocket())

  const sendMessage = (message: string) => {
    socket.current.emit("chat", message)
  }

  return { sendMessage }
}
