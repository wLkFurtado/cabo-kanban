import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [phoneOrEmail, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm">Telefone ou e-mail</label>
            <Input value={phoneOrEmail} onChange={(e) => setId(e.target.value)} placeholder="+5522999999999" />
          </div>
          <div>
            <label className="text-sm">Senha</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full" onClick={() => toast({ title: "Conecte o Supabase", description: "Autenticação real será habilitada após integrar o Supabase." })}>
            Acessar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
