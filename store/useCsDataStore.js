import {create} from "zustand";

const useCsDataStore = create((set) => ({
  cs: {},
  setCs: (cs) => set({ cs }),
}));

export default useCsDataStore;
