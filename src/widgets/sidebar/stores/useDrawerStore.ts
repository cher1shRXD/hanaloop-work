import { create } from "zustand";

interface State {
  minimized: boolean;
  setMinimized: (minimized: boolean) => void;
  toggleMinimized: () => void;
}

export const useDrawerStore = create<State>((set) => ({
  minimized: true,
  setMinimized: (minimized) => set({ minimized }),
  toggleMinimized: () => set((state) => ({ minimized: !state.minimized })),
}));
