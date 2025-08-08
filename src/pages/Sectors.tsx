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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {sectors.map((s) => (
          <Card key={s.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-base min-w-0 tracking-normal">
                <Building2 className="h-4 w-4 shrink-0" />
                <span className="truncate">{s.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0 text-sm text-muted-foreground">
              <p>Boards: 1</p>
              <div className="mt-3 min-w-0">
                <Link to="/boards/demo" className="inline-flex w-full min-w-0 items-center gap-2 text-primary hover:underline">
                  <Trello className="h-4 w-4 shrink-0" />
                  <span className="truncate">Abrir board de exemplo</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
