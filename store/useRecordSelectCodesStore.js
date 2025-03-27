import { create } from "zustand";

const useRecordSelectCodesStore = create((set, get) => ({
  selectedCodes: [],
  setSelectedCodes: (selectedCodes) => set({ selectedCodes }),
  // setSelectedCodes: (selectedCodes, codeGroupId) => {
  //   const currentList = get().selectedCodesList;
  //   const newCodesList = { ...currentList, [codeGroupId]: selectedCodes };
  //   set({ selectedCodesList: newCodesList });
  // },
  // getSelectedCodes: (codeGroupId) => get().selectedCodesList[codeGroupId],
}));

export default useRecordSelectCodesStore;
