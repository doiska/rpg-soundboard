"use client";

import { Sidebar } from "@/components/room/sidebar";
import { SoundboardSidebar } from "@/components/room/soundboard/sidebar/soundboard-sidebar";
import { ChatSidebar } from "@/components/room/players/chat-sidebar";
import { cn } from "@/lib/utils";

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

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sides = ["soundboard", "chat"];

  return (
    <div className="grid grid-cols-6 h-screen w-screen">
      <div className={cn(["w-full h-full", `col-span-${6 - sides.length}`])}>
        {children}
      </div>
      {sides.map((sidebar) => (
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
  );
}
