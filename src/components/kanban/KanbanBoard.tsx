import React from "react";
import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard() {
  const data = [
    {
      id: "todo",
      title: "A Fazer",
      cards: [
        {
          id: "c1",
          title: "Criar fluxo de cadastro",
          description: "Nome + telefone + senha",
          badges: [{ id: "b1", label: "Auth" }],
        },
        {
          id: "c2",
          title: "Ajustar padding dos cards",
          description: "Aplicar p-3 md:p-4 + gap-2",
          badges: [{ id: "b2", label: "UI" }],
        },
      ],
    },
    {
      id: "doing",
      title: "Em Progresso",
      cards: [
        {
          id: "c3",
          title: "Webhooks base",
          description: "Eventos: card_created, card_moved",
          badges: [{ id: "b3", label: "Backend" }],
        },
      ],
    },
    {
      id: "done",
      title: "Concluído",
      cards: [
        {
          id: "c4",
          title: "Setup projeto",
          description: "Vite + TS + Tailwind + shadcn",
          badges: [{ id: "b4", label: "Infra" }],
        },
      ],
    },
  ];

  return (
    <section aria-label="Kanban básico" className="w-full h-full">
      <div className="flex items-start gap-3 overflow-x-auto px-3 pb-3">
        {data.map((col) => (
          <KanbanColumn key={col.id} id={col.id} title={col.title} cards={col.cards} />
        ))}
      </div>
    </section>
  );
}
