// store/useBoardStore.js
import { create } from "zustand";

const useActiveKeyStore = create((set) => ({
  activeKey: null,
  setActiveKey: (key) => set({ activeKey: key }),
}));

export default useActiveKeyStore;
