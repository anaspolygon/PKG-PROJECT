import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ItemsState {
  items: Record<string, unknown>;
  addItem: (key: string, item: unknown) => void;
  removeItem: (key: string) => void;
  clearItems: () => void;
}

export const useItemsStore = create<ItemsState>()(
  persist(
    (set) => ({
      items: {},

      addItem: (key, item) =>
        set((state) => ({
          items: { ...state.items, [key]: item },
        })),
      removeItem: (key) =>
        set((state) => {
          const newItems = { ...state.items };
          delete newItems[key];

          return { items: newItems };
        }),

      clearItems: () => set({ items: {} }),
    }),
    {
      name: "items-storage",
    }
  )
);
