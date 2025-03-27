import { create } from "zustand";

const useCsDataStore = create((set) => ({
  cs: {},
  setCs: (cs) => set({ cs }),
  csDetail: {},
  setCsDetail: (csDetail) => set({ csDetail }),
}));

export default useCsDataStore;
