import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface userState {
  user: User | null;
  saveUser: (info: User | null) => void;
}

export const useAuthStore = create<userState>((set) => ({
  user: null,
  saveUser: (info) => set({ user: info }),
}));
