// store/useBoardStore.js
import { create } from "zustand";

const useDocxUrlStore = create((set) => ({
  docxUrlList: [],
  setDocxUrlList: (list) => set({ docxUrlList: list }),
}));

export default useDocxUrlStore;
