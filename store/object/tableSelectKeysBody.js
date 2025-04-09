import { create } from "zustand";

const createTableSelectKeysStore = () =>
  create((set) => ({
    selectedRowKeys: [],
    setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
    anchorRowKey: null,
    setAnchorRowKey: (anchorRowKey) => set({ anchorRowKey }),
    cursorRowKey: null,
    setCursorRowKey: (cursorRowKey) => set({ cursorRowKey }),
    datas: [],
    setDatas: (datas) => set({ datas }),
  }));

export default createTableSelectKeysStore;
