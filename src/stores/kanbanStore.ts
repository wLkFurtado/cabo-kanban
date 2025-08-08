import { create } from "zustand";

export type Label = { id: string; name: string; color: string };
export type Member = { id: string; name: string };
export type Card = {
  id: string;
  title: string;
  description?: string;
  position: number;
  labels: string[]; // label ids
  assignees: string[]; // member ids
  dueDate?: string;
};
export type List = { id: string; name: string; position: number; cardIds: string[] };
export type Board = {
  id: string;
  name: string;
  description?: string;
  lists: Record<string, List>;
  cards: Record<string, Card>;
  listOrder: string[];
  labels: Record<string, Label>;
  members: Record<string, Member>;
};

function between(a: number, b: number) {
  return (a + b) / 2;
}

type KanbanState = {
  boards: Record<string, Board>;
  moveCard: (boardId: string, cardId: string, fromListId: string, toListId: string, toIndex: number) => void;
  reorderCard: (boardId: string, listId: string, cardId: string, toIndex: number) => void;
};

const initialBoard: Board = {
  id: "demo",
  name: "Plano de Ações — Cabo Frio",
  description: "Board de exemplo para demonstrar funcionalidades",
  lists: {
    todo: { id: "todo", name: "A Fazer", position: 1, cardIds: ["c1", "c2"] },
    doing: { id: "doing", name: "Em Progresso", position: 2, cardIds: ["c3"] },
    done: { id: "done", name: "Concluído", position: 3, cardIds: [] },
  },
  listOrder: ["todo", "doing", "done"],
  cards: {
    c1: { id: "c1", title: "Ofício nº 123", position: 1, labels: ["l-blue"], assignees: ["m1"], description: "Preparar documento para assinatura." },
    c2: { id: "c2", title: "Agendar reunião com Saúde", position: 2, labels: ["l-teal"], assignees: ["m2"], dueDate: new Date(Date.now()+86400000).toISOString() },
    c3: { id: "c3", title: "Contrato de manutenção", position: 1, labels: ["l-yellow"], assignees: [], description: "Revisão de cláusulas" },
  },
  labels: {
    "l-blue": { id: "l-blue", name: "Prioridade", color: "#2563eb" },
    "l-teal": { id: "l-teal", name: "Parceria", color: "#0d9488" },
    "l-yellow": { id: "l-yellow", name: "Financeiro", color: "#eab308" },
  },
  members: {
    m1: { id: "m1", name: "Maria" },
    m2: { id: "m2", name: "João" },
  },
};

export const useKanbanStore = create<KanbanState>((set, get) => ({
  boards: { [initialBoard.id]: initialBoard },
  moveCard: (boardId, cardId, fromListId, toListId, toIndex) => {
    const state = get();
    const board = state.boards[boardId];
    if (!board) return;
    const from = board.lists[fromListId];
    const to = board.lists[toListId];
    const fromIdx = from.cardIds.indexOf(cardId);
    if (fromIdx >= 0) from.cardIds.splice(fromIdx, 1);
    const insertIndex = Math.max(0, Math.min(toIndex, to.cardIds.length));
    to.cardIds.splice(insertIndex, 0, cardId);

    // Recompute positions nearby for stability
    const prevId = to.cardIds[insertIndex - 1];
    const nextId = to.cardIds[insertIndex + 1];
    const prevPos = prevId ? board.cards[prevId].position : insertIndex;
    const nextPos = nextId ? board.cards[nextId].position : insertIndex + 2;
    board.cards[cardId].position = between(prevPos, nextPos);

    // Persist state
    set({ boards: { ...state.boards, [boardId]: { ...board, lists: { ...board.lists }, cards: { ...board.cards } } } });
  },
  reorderCard: (boardId, listId, cardId, toIndex) => {
    const state = get();
    const board = state.boards[boardId];
    const list = board.lists[listId];
    const fromIdx = list.cardIds.indexOf(cardId);
    if (fromIdx < 0) return;
    list.cardIds.splice(fromIdx, 1);
    const insertIndex = Math.max(0, Math.min(toIndex, list.cardIds.length));
    list.cardIds.splice(insertIndex, 0, cardId);

    const prevId = list.cardIds[insertIndex - 1];
    const nextId = list.cardIds[insertIndex + 1];
    const prevPos = prevId ? board.cards[prevId].position : insertIndex;
    const nextPos = nextId ? board.cards[nextId].position : insertIndex + 2;
    board.cards[cardId].position = between(prevPos, nextPos);

    set({ boards: { ...state.boards, [boardId]: { ...board, lists: { ...board.lists }, cards: { ...board.cards } } } });
  },
}));
