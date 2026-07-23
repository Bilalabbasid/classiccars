import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchlistState {
  items: string[]; // car/lot ids
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  count: () => number;
}

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) => set((state) => ({ items: [...state.items, id] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i !== id) })),
      toggleItem: (id) => {
        if (get().items.includes(id)) {
          get().removeItem(id);
        } else {
          get().addItem(id);
        }
      },
      hasItem: (id) => get().items.includes(id),
      count: () => get().items.length,
    }),
    { name: "classic-chrome-watchlist" }
  )
);
