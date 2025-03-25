import { create } from "zustand";

const useCsCreateConstantStore = create((set) => ({
  recordKeys: [],
  setRecordKeys: (recordKeys) => set({ recordKeys }),
  checkedKeySet: new Set(),
  setCheckedKeySet: (checkedKeySet) => set({ checkedKeySet }),
}));

export default useCsCreateConstantStore;
