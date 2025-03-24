import { create } from "zustand";

const useModalStore = create((set) => ({
  disabled: true,
  setDisabled: (disabled) => set({ disabled }),
  data: {},
  setData: (data) => set({ data }),
  list: [],
  setList: (list) => set({ list }),
  size: 10,
  setSize: (size) => set({ size }),
  openSearchModal: false,
  setOpenSearchModal: (openSearchModal) => set({ openSearchModal }),
}));

export default useModalStore;
