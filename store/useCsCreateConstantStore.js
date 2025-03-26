import { create } from "zustand";

const useCsCreateConstantStore = create((set) => ({
  recordKeys: [],
  setRecordKeys: (recordKeys) => set({ recordKeys }),
  checkedKeySet: new Set(),
  setCheckedKeySet: (checkedKeySet) => set({ checkedKeySet }),
  isAsDetailCommon: true,
  setIsAsDetailCommon: (isAsDetailCommon) => set({ isAsDetailCommon }),
  isFollowUpCommon: true,
  setIsFollowUpCommon: (isFollowUpCommon) => set({ isFollowUpCommon }),
}));

export default useCsCreateConstantStore;
