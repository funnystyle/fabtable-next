import { create } from "zustand";

const useTableSelectKeysStore = create((set) => ({
  selectedRowKeys: [],
  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
}));

export default useTableSelectKeysStore;
