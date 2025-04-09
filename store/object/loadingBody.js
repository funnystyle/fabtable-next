import { create } from "zustand";

const loadingStore = () =>
  create((set) => ({
    loading: true,
    setLoading: (loading) => set({ loading }),
    progress: 0,
    setProgress: (progress) => set({ progress }),
  }));

export default loadingStore;