import { create } from "zustand";

const useRecordSelectCodesStore = create((set) => ({
  selectedCodes: [],
  setSelectedCodes: (selectedCodes) => set({ selectedCodes }),
}));

export default useRecordSelectCodesStore;
