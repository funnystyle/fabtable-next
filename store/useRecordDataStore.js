import { create } from "zustand";

const useRecordDataStore = create((set) => ({
  record: {},
  setRecord: (record) => set({ record }),
  tags: [],
  setTags: (tags) => set({ tags }),
  resetFlag: false,
  handleReset: () => set((state) => ({ resetFlag: !state.resetFlag })),
}));

export default useRecordDataStore;
