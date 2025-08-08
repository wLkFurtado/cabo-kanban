import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "@/hooks/use-toast";

export type ProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (open && user) {
      setName(user.name ?? "");
      setIdentifier(user.identifier ?? user.email ?? "");
      setAvatarUrl(user.avatarUrl ?? "");
    }
  }, [open, user]);

  const onSave = () => {
    if (!user) return;
    updateUser({ name: name.trim() || user.name, identifier: identifier.trim() || user.identifier, email: identifier.includes("@") ? identifier.trim() : user.email, avatarUrl: avatarUrl.trim() || undefined });
    toast({ title: "Perfil atualizado", description: "Suas informações foram salvas." });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Meu perfil</DialogTitle>
          <DialogDescription>Atualize seu nome, contato e foto.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="identifier">E-mail ou Telefone</Label>
            <Input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="email@exemplo.com ou +55..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="avatar">URL da foto (opcional)</Label>
            <Input id="avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://.../foto.jpg" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
