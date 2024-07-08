// store/useBoardStore.js
import { create } from "zustand";

const useBoardStore = create((set) => ({
  boardList: [],
  setBoardList: (list) => set({ boardList: list }),
}));

export default useBoardStore;
