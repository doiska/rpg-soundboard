"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface SidebarContextType {
  sidebars: string[];
  addSidebar: (name: string) => void;
  removeSidebar: (name: string) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  sidebars: [],
  addSidebar: () => {},
  removeSidebar: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebars, setSidebars] = useState<string[]>([]);

  const addSidebar = useCallback((name: string) => {
    setSidebars((prev) => [...prev, name]);
  }, []);

  const removeSidebar = useCallback((name: string) => {
    setSidebars((prev) => prev.filter((item) => item !== name));
  }, []);

  return (
    <SidebarContext.Provider value={{ sidebars, addSidebar, removeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
