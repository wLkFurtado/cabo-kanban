import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <header className="h-14 flex items-center border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 w-full">
        <SidebarTrigger className="ml-2" />
        <div className="ml-3 flex items-center gap-2">
          <div className={cn("h-8 w-8 rounded-md shadow-[var(--shadow-soft)]", "bg-[image:var(--gradient-primary)]")} />
          <span className="font-semibold">Kanban Prefeitura</span>
        </div>
        <div className="ml-auto mr-3 flex items-center gap-2">
          <Button variant="soft" size="sm" aria-label="Notificações">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notificações</span>
          </Button>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-56px)] w-full">
        <AppSidebar />
        <main className="flex-1 bg-[image:var(--gradient-muted)]">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
