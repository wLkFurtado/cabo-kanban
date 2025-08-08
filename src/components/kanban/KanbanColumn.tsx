import React from "react";
import { KanbanCard, KanbanCardProps } from "./KanbanCard";

export type KanbanColumnProps = {
  id: string;
  title: string;
  cards: KanbanCardProps[];
};

export function KanbanColumn({ title, cards }: KanbanColumnProps) {
  return (
    <section className="w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0 min-w-0">
      <header className="sticky top-0 z-10 px-2 pb-2 pt-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </header>
      <div className="flex flex-col gap-2 px-2 pb-2">
        {cards.map((card) => (
          <KanbanCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
}
