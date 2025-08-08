import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm">Nome completo</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Maria Silva" />
          </div>
          <div>
            <label className="text-sm">Telefone (E.164)</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+5522999999999" />
          </div>
          <div>
            <label className="text-sm">Senha</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full" onClick={() => toast({ title: "Cadastro simulado", description: "Ao integrar o Supabase, enviaremos um OTP por SMS/WhatsApp." })}>
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
