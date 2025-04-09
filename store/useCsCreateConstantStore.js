import { create } from "zustand";

const useCsCreateConstantStore = create((set) => ({
  recordKeys: [null],
  setRecordKeys: (recordKeys) => set({ recordKeys }),
  subRecordKeys: [null],
  setSubRecordKeys: (subRecordKeys) => set({ subRecordKeys }),
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
  loading: true,
  setLoading: (loading) => set({ loading }),
}));

export default useCsCreateConstantStore;
