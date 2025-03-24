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
  page: 1,
  setPage: (page) => set({ page }),
  openSearchModal: false,
  setOpenSearchModal: (openSearchModal) => set({ openSearchModal }),
  formData: {},
  setFormData: (formData) => set({ formData }),
  deleteTagKeyName: "",
  setDeleteTagKeyName: (deleteTagKeyName) => set({ deleteTagKeyName }),
}));

export default useModalStore;
