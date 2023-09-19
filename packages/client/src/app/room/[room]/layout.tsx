"use client";

import { Sidebar } from "@/components/room/sidebar";
import { SoundboardSidebar } from "@/components/room/soundboard/soundboard-sidebar";
import { SidebarProvider } from "@/hooks/useSidebar";
import { ChatSidebar } from "@/components/room/players/chat-sidebar";

const sidebars = {
  soundboard: {
    title: "Soundboard",
    component: <SoundboardSidebar />,
  },
  chat: {
    title: "Players",
    component: <ChatSidebar />,
  },
};

export default function RoomLayout() {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-6 h-screen w-screen">
        <div className="col-span-4"></div>
        {["soundboard", "chat"].map((sidebar) => (
          <Sidebar
            id={sidebar}
            key={sidebar}
            title={sidebars[sidebar as keyof typeof sidebars].title}
            className="col-span-1"
          >
            {sidebars[sidebar as keyof typeof sidebars].component}
          </Sidebar>
        ))}
      </div>
    </SidebarProvider>
  );
}
