import { create } from "zustand";

const useOrderListQueryStore = create((set) => ({
  size: 10,
  page: 1,
  searchKeyword: "",
  searchStatusList: [],
  selectedRowKeys: [],
  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
  queryKey: ["record-list", "", 10, [], 1, Math.random()],
  handleReload: () => set((state) => ({
    queryKey: ["record-list", state.searchKeyword, state.size, state.searchStatusList, state.page, Math.random()],
  })),

  setSearchKeyword: (keyword) =>
    set((state) => ({
      searchKeyword: keyword,
      queryKey: ["record-list", keyword, state.size, state.searchStatusList, state.page, Math.random()],
    })),

  setSize: (size) =>
    set((state) => ({
      size,
      queryKey: ["record-list", state.searchKeyword, size, state.searchStatusList, state.page, Math.random()],
    })),

  setPage: (page) =>
    set((state) => ({
      page,
      queryKey: ["record-list", state.searchKeyword, state.size, state.searchStatusList, page, Math.random()],
    })),

  setSearchStatusList: (statusList) =>
    set((state) => ({
      searchStatusList: statusList,
      queryKey: ["record-list", state.searchKeyword, state.size, statusList, state.page, Math.random()],
    })),
}));

export default useOrderListQueryStore;
