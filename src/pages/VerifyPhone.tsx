import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function VerifyPhonePage() {
  const [code, setCode] = useState("");

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Verificar telefone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm">Código OTP</label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
          </div>
          <Button className="w-full" onClick={() => toast({ title: "Verificação simulada", description: "Integre o Supabase para habilitar OTP real." })}>
            Verificar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
