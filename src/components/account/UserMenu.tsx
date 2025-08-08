import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ProfileDialog } from "./ProfileDialog";

export function UserMenu() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);

  const initials = useMemo(() => {
    const n = user?.name || "U";
    const parts = n.trim().split(/\s+/);
    return (parts[0]?.[0] || "U") + (parts[1]?.[0] || "");
  }, [user?.name]);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 px-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.avatarUrl} alt={user?.name || "Usuário"} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="max-w-[140px] truncate text-sm font-medium">{user?.name || "Usuário"}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name || "Usuário"} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user?.name || "Usuário"}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email || user?.identifier}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenProfile(true)}>Meu perfil</DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast({ title: "Configurações", description: "Em breve." })}>Configurações</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog open={openProfile} onOpenChange={setOpenProfile} />
    </>
  );
}
