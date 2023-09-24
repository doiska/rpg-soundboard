"use client"

import {ScrollArea} from "@/components/ui/scroll-area";
import {useChat, useChatSender} from "@/hooks/ws/useChat";
import {Button} from "@/components/ui/button";
import {useState} from "react";


export function ChatConversation() {
    const { messages } = useChat();
    const { sendMessage } = useChatSender();

    const [message, setMessage] = useState("")

    return (
        <>
            <ScrollArea className="h-80">
                <div className="flex flex-col flex-1 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center">
                                    <span className="ml-2 text-xs font-bold text-gray-400">
                                        {message}
                                    </span>
                                </div>
                                    <span className="px-2 py-1 mt-1 text-sm font-medium text-gray-200 bg-gray-700 rounded-full">
                                {message}
                            </span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="flex">
                <input
                    type="text"
                    className="w-full px-4 py-2 mt-2 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="outline" onClick={() => {
                    sendMessage(message)
                    setMessage("")
                }}>S</Button>
            </div>
        </>
    )
}
