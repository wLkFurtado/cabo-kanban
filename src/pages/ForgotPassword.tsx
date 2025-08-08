import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader>
            <CardTitle>Esqueci minha senha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm">Telefone (E.164)</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+5522999999999" />
            </div>
            <Button className="w-full" onClick={() => toast({ title: "Recuperação simulada", description: "Ao integrar o Supabase, enviaremos um OTP para redefinição." })}>
              Enviar código
            </Button>
            <div className="text-center text-sm">
              <a href="/" className="text-primary underline underline-offset-4">Voltar para login</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
