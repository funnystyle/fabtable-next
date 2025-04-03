import { create } from "zustand";

const useRecordModalStore = create((set) => ({
  // drag
  disabled: true,
  setDisabled: (disabled) => set({ disabled }),

  // response
  data: {},
  setData: (data) => set({ data }),
  list: [],
  setList: (list) => set({ list }),
  total: 0,
  setTotal: (total) => set((state) => ({
    total,
    totalPages: Math.ceil(total / state.size),
  })),
  totalPages: 0,

  // request
  size: 500,
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
  openCopyModal: false,
  setOpenCopyModal: (openCopyModal) => set({ openCopyModal }),
  openEditModal: false,
  setOpenEditModal: (openEditModal) => set({ openEditModal }),

  // modal open constant
  index: 0,
  setIndex: (index) => set({ index }),
  openDiv: "",
  setOpenDiv: (openDiv) => set({ openDiv }),

  // form event
  formData: {},
  setFormData: (formData) => set({ formData }),
  deleteTagKeyName: "",
  setDeleteTagKeyName: (deleteTagKeyName) => set({ deleteTagKeyName }),
}));

export default useRecordModalStore;
