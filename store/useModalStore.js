import { create } from "zustand";

const useModalStore = create((set) => ({
  // drag
  disabled: true,
  setDisabled: (disabled) => set({ disabled }),

  // response
  data: {},
  setData: (data) => set({ data }),
  list: [],
  setList: (list) => set({ list }),

  // request
  size: 10,
  setSize: (size) => set({ size }),
  page: 1,
  setPage: (page) => set({ page }),
  searchKeyword: "",
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
  searchStatusList: [],
  setSearchStatusList: (searchStatusList) => set({ searchStatusList }),
  searchData: {},
  setSearchData: (searchData) => set({ searchData }),

  // modal open
  openSearchModal: false,
  setOpenSearchModal: (openSearchModal) => set({ openSearchModal }),

  // form event
  formData: {},
  setFormData: (formData) => set({ formData }),
  deleteTagKeyName: "",
  setDeleteTagKeyName: (deleteTagKeyName) => set({ deleteTagKeyName }),
}));

export default useModalStore;
