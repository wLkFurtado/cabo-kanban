import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Trello } from "lucide-react";

const sectors = [
  { id: "saude", name: "Saúde" },
  { id: "educacao", name: "Educação" },
  { id: "administracao", name: "Administração" },
];

export default function SectorsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Setores</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sectors.map((s) => (
          <Card key={s.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                {s.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Boards: 1</p>
              <div className="mt-3">
                <Link to="/boards/demo" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Trello className="h-4 w-4" /> Abrir board de exemplo
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
