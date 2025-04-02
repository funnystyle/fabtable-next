import { create } from "zustand";

const useCsDataStore = create((set) => ({
  cs: {},
  setCs: (cs) => set({ cs }),
  csDetail: {},
  setCsDetail: (csDetail) => set({ csDetail }),
  tags: [],
  setTags: (tags) => set({ tags }),
  isCopy: false,
  setIsCopy: (isCopy) => set({ isCopy }),
  isChange: false,
  setIsChange: (isChange) => set({ isChange }),
}));

export default useCsDataStore;
