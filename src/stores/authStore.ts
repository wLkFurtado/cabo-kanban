import { create } from "zustand";

type User = { id: string; name: string; identifier: string; email?: string; avatarUrl?: string };

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loginTest: (identifier: string, password: string) => boolean;
  updateUser: (patch: Partial<User>) => void;
  logout: () => void;
};

const LS_KEY = "auth:test-session";

function loadSession(): Pick<AuthState, "isAuthenticated" | "user"> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { isAuthenticated: false, user: null };
    const parsed = JSON.parse(raw);
    return parsed?.isAuthenticated
      ? { isAuthenticated: true, user: parsed.user ?? null }
      : { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  ...loadSession(),
  loginTest: (identifier: string, password: string) => {
    // Credenciais de teste (mock)
    const validCombos = [
      { idf: "+5522999999999", pass: "teste123", name: "Admin Cabo Frio" },
      { idf: "admin@prefeitura.test", pass: "teste123", name: "Admin Cabo Frio" },
    ];
    const match = validCombos.find((c) => c.idf === identifier && c.pass === password);
    if (match) {
      const user: User = {
        id: "u-demo",
        name: match.name,
        identifier,
        email: identifier.includes("@") ? identifier : undefined,
        avatarUrl: undefined,
      };
      const next = { isAuthenticated: true, user };
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      set(next);
      return true;
    }
    return false;
  },
  updateUser: (patch: Partial<User>) => {
    const current = get();
    if (!current.user) return;
    const user = { ...current.user, ...patch } as User;
    const next = { isAuthenticated: true, user };
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    set(next);
  },
  logout: () => {
    localStorage.removeItem(LS_KEY);
    set({ isAuthenticated: false, user: null });
  },
}));
