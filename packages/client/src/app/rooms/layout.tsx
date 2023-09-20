import { SidebarProvider } from "@/hooks/useSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
