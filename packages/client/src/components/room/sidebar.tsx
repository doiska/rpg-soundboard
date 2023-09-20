import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Sidebar({ title, children, className }: SidebarProps) {
  return (
    <div className={cn("w-full border-l-2", className)}>
      <div className="space-y-4 px-2 mt-2">
        <div>
          <h2 className="relative text-xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
