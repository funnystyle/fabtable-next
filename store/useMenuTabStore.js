import { create } from "zustand";
import { adminItems, basicItems } from "@components/menu/data/menuItems";

// 📌 url 값으로 3-depth까지 메뉴 찾기
const findMenuItemByUrl = (menuList, url) => {
  for (const item of menuList) {
    if (item.url === url) return item;
    if (item.children) {
      const found = findMenuItemByUrl(item.children, url);
      if (found) return found;
    }
  }
  return null;
};

// 📌 클릭한 메뉴의 부모 key 추적
const getParentKeys = (key, menuList, parents = []) => {
  for (const item of menuList) {
    if (item.key === key) return parents;
    if (item.children) {
      const found = getParentKeys(key, item.children, [...parents, item.key]);
      if (found) return found;
    }
  }
  return null;
};

const useMenuTabStore = create((set, get) => ({
  tabs:[{ key: "1", label: "대시보드", url: "/dashboard" },],
  setTabs: (tabs) => set({ tabs }),
  activeTab: "1",
  setActiveTab: (activeTab) => set({ activeTab }),
  selectedMenuKeys: ["1"],
  setSelectedMenuKeys: (selectedMenuKeys) => set({ selectedMenuKeys }),
  openKeys: ["2", "3", "33", "4", "44", "7", "admin-2"],
  setOpenKeys: (openKeys) => set({ openKeys }),
  moveUrl: (url) => {
    const menuItem = findMenuItemByUrl([...basicItems, ...adminItems], url);
    if (!menuItem || !menuItem.url) return;

    const prevTabs = get().tabs;
    const exists = prevTabs.find(tab => tab.key === menuItem.key);

    if (!exists) {
      const newTabs = [...prevTabs, {
        key: menuItem.key,
        label: menuItem.label,
        url: menuItem.url
      }];
      set({ tabs: newTabs });
    }

    set({ activeTab: menuItem.key });
    set({ selectedMenuKeys: [menuItem.key] });

    const parentKeys = getParentKeys(menuItem.key, [...basicItems, ...adminItems]);
    // set({ openKeys: parentKeys ? [...parentKeys] : [] });
  },
}));

export default useMenuTabStore;
