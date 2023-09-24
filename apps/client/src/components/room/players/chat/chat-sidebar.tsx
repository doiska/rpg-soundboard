import {ChatConversation} from "@/components/room/players/chat/chat-conversation";

export function ChatSidebar() {
  return (
    <div className="flex flex-col bg-gray-800">
      <ChatConversation />
    </div>
  )
}
