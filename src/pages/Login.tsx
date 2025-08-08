import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [phoneOrEmail, setId] = useState("");
  const [password, setPassword] = useState("");
  const loginTest = useAuthStore((s) => s.loginTest);
  const navigate = useNavigate();

  const onSubmit = () => {
    const ok = loginTest(phoneOrEmail.trim(), password);
    if (ok) {
      toast({ title: "Bem-vindo!", description: "Login de teste realizado." });
      navigate("/boards/demo");
    } else {
      toast({ title: "Credenciais inválidas", description: "Use +5522999999999 / teste123 ou admin@prefeitura.test / teste123" });
    }
  };

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
          <Button className="w-full" onClick={onSubmit}>
            Acessar
          </Button>
          <div className="text-center text-sm">
            <a href="/forgot" className="text-primary underline underline-offset-4">Esqueci minha senha</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
