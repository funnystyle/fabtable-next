import { create } from "zustand";

const useModalStore = create((set) => ({
  disabled: true,
  setDisabled: (disabled) => set({ disabled }),
  list: [],
  setList: (list) => set({ list }),
  openSearchModal: false,
  setOpenSearchModal: (openSearchModal) => set({ openSearchModal }),
}));

export default useModalStore;
