"use client"

import {ScrollArea} from "@/components/ui/scroll-area";
import {useChat} from "@/hooks/ws/useChat";


export function ChatConversation() {
    const { messages } = useChat();

    return (
        <ScrollArea className="h-80">
            <div className="flex flex-col flex-1 overflow-y-auto">
            {messages.map((message, index) => (
                <div key={index} className="flex items-start">
                    <div className="flex flex-col items-start">
                        <div className="flex items-center">
                            <img
                                src="https://avatars.githubusercontent.com/u/263385"
                                className="w-6 h-6 rounded-full"
                             alt="avatar" />
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
    )
}
