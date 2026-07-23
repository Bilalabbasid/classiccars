import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isRegistered: boolean;
  register: () => void;
  unregister: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isRegistered: false,
      register: () => set({ isRegistered: true }),
      unregister: () => set({ isRegistered: false }),
    }),
    { name: "classic-chrome-auth" }
  )
);
