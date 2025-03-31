import { create } from "zustand";

const useRecordDataStore = create((set) => ({
  record: {},
  setRecord: (record) => set({ record }),
  tags: [],
  setTags: (tags) => set({ tags }),
}));

export default useRecordDataStore;
