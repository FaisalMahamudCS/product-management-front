"use client";

import { create } from "zustand";

type UserState = {
  user: { id: string; name: string; role: string } | null;
  setUser: (user: UserState["user"]) => void;
  logout: () => void;
};

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
