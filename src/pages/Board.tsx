import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useKanbanStore } from "@/stores/kanbanStore";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function KanbanCard({ id, title, labels, dueDate }: { id: string; title: string; labels: string[]; dueDate?: string }) {
  const board = useKanbanStore((s) => s.boards["demo"]);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <UICard className="mb-3 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-3 text-left">
          <div className="flex flex-wrap gap-1 mb-2">
            {labels.map((lid) => (
              <span key={lid} className="h-2 w-8 rounded" style={{ backgroundColor: board.labels[lid]?.color }} />
            ))}
          </div>
          <div className="font-medium leading-snug">{title}</div>
          {dueDate && (
            <Badge variant="secondary" className="mt-2">Vence {new Date(dueDate).toLocaleDateString()}</Badge>
          )}
        </CardContent>
      </UICard>
    </div>
  );
}

function KanbanList({ listId }: { listId: string }) {
  const board = useKanbanStore((s) => s.boards["demo"]);
  const list = board.lists[listId];
  return (
    <div className="w-72 shrink-0 rounded-md bg-card border shadow-sm mr-4">
      <CardHeader className="py-3 px-3">
        <CardTitle className="text-sm">{list.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <SortableContext items={list.cardIds} strategy={rectSortingStrategy}>
          {list.cardIds.map((cid) => {
            const c = board.cards[cid];
            return (
              <KanbanCard key={cid} id={cid} title={c.title} labels={c.labels} dueDate={c.dueDate} />
            );
          })}
        </SortableContext>
      </CardContent>
    </div>
  );
}

export default function BoardPage() {
  const { boardId = "demo" } = useParams();
  const board = useKanbanStore((s) => s.boards[boardId]);
  const moveCard = useKanbanStore((s) => s.moveCard);
  const reorderCard = useKanbanStore((s) => s.reorderCard);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const listOrder = board?.listOrder ?? [];
  const items = useMemo(() => listOrder.flatMap((lid) => board.lists[lid].cardIds), [board, listOrder]);

  function onDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;
    if (active.id === over.id) return;

    // Find source and destination
    const fromListId = listOrder.find((lid) => board.lists[lid].cardIds.includes(String(active.id)));
    const toListId = listOrder.find((lid) => board.lists[lid].cardIds.includes(String(over.id)));
    if (!fromListId || !toListId) return;

    const fromIndex = board.lists[fromListId].cardIds.indexOf(String(active.id));
    const toIndex = board.lists[toListId].cardIds.indexOf(String(over.id));

    if (fromListId === toListId) {
      reorderCard(board.id, fromListId, String(active.id), toIndex);
    } else {
      moveCard(board.id, String(active.id), fromListId, toListId, toIndex);
    }
  }

  if (!board) return <div>Board não encontrado.</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{board.name}</h1>
      <div className="flex items-start overflow-x-auto pb-4">
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <div className="flex">
            {listOrder.map((lid) => (
              <KanbanList key={lid} listId={lid} />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
