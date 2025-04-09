import { create } from "zustand";

const useCsCreateConstantStore = create((set) => ({
  recordKeys: [null],
  setRecordKeys: (recordKeys) => set({ recordKeys }),
  recordSerialNumbers: [null],
  setRecordSerialNumbers: (recordSerialNumbers) => set({ recordSerialNumbers }),
  asKeys: [],
  setAsKeys: (asKeys) => set({ asKeys }),
  checkedKeySet: new Set(),
  setCheckedKeySet: (checkedKeySet) => set({ checkedKeySet }),
  isAsDetailCommon: true,
  setIsAsDetailCommon: (isAsDetailCommon) => set({ isAsDetailCommon }),
  isFollowUpCommon: true,
  files: {},
  setFiles: (files) => set({ files }),
  setIsFollowUpCommon: (isFollowUpCommon) => set({ isFollowUpCommon }),
}));

export default useCsCreateConstantStore;
