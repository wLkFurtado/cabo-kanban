import { NavLink, useLocation } from "react-router-dom";
import { LayoutGrid, Trello, Building2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Setores", url: "/sectors", icon: Building2 },
  { title: "Board de Exemplo", url: "/boards/demo", icon: Trello },
];

export function AppSidebar() {
  
  const location = useLocation();
  const currentPath = location.pathname;

  const isActivePath = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible={"icon"}>
      <SidebarContent className="scrollbar-stable">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            <span>Menu</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActivePath(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
