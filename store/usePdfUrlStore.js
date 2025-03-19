// store/useBoardStore.js
import { create } from "zustand";

const usePdfUrlStore = create((set) => ({
  pdfUrlList: [],
  setPdfUrlList: (list) => set({ pdfUrlList: list }),
}));

export default usePdfUrlStore;
