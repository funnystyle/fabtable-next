import { create } from "zustand";

const useDrawerStore = create((set) => ({
  openDrawer: false,
  setOpenDrawer: (open) => set({ openDrawer: open }),
  drawerHeader: null,
  setDrawerHeader: (header) => set({ drawerHeader: header }),
  drawerContent: null,
  setDrawerContent: (content) => set({ drawerContent: content }),
  drawerFooter: null,
  setDrawerFooter: (footer) => set({ drawerFooter: footer }),
  drawerTitle: "",
  setDrawerTitle: (title) => set({ drawerTitle: title }),
  closeDrawer: () => set({ openDrawer: false }),
  selectedPrint: "label",
  setSelectedPrint: (selected) => set({ selectedPrint: selected }),
  labelContent: null,
  setLabelContent: (content) => set({ labelContent: content }),
  certificateId: 1,
  setCertificateId: (id) => set({ certificateId: id }),
}));

export default useDrawerStore;
