import { create } from "zustand";

const useRecordDataStore = create((set) => ({
  record: {},
  setRecord: (record) => set({ record }),
}));

export default useRecordDataStore;
