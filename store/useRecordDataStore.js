import { create } from "zustand";

const useRecordDataStore = create((set) => ({
  record: {},
  setRecord: (record) => set({ record }),
  tags: [],
  setTags: (tags) => set({ tags }),
  resetFlag: false,
  handleReset: () => set((state) => ({ resetFlag: !state.resetFlag })),
  nowState: null,
  setNowState: (nowState) => set({ nowState }),
  tagInfoList: [],
  setTagInfoList: (tagInfoList) => set({ tagInfoList }),
  isCopy: false,
  setIsCopy: (isCopy) => set({ isCopy }),
  isChange: false,
  setIsChange: (isChange) => set({ isChange }),
  serialNumber: null,
  setSerialNumber: (serialNumber) => set({ serialNumber }),
  isNew: true,
  setIsNew: (isNew) => set({ isNew }),
}));

export default useRecordDataStore;
