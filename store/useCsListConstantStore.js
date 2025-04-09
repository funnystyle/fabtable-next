import { create } from "zustand";

const useCsListConstantStore = create((set) => ({
  showList: [true, true, true, true, true],
  setShowList: (showList) => set({ showList }),
}));

export default useCsListConstantStore;
