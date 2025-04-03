import { create } from "zustand";

const useModalEventStore = create((set) => ({
  // drag
  disabled: true,
  setDisabled: (disabled) => set({ disabled }),

}));

export default useModalEventStore;
