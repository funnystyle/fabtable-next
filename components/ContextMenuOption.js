export const contextMenuOptions = [
  {
    label: "Main Option 1",
    submenu: [
      { label: "Sub Option 1-1", action: () => alert("Sub Option 1-1 selected") },
      { label: "Sub Option 1-2", action: () => alert("Sub Option 1-2 selected") },
    ],
  },
  { label: "Main Option 2", action: () => alert("Main Option 2 selected") },
  {
    label: "Main Option 3",
    submenu: [
      { label: "Sub Option 3-1", action: () => alert("Sub Option 3-1 selected") },
      { label: "Sub Option 3-2", action: () => alert("Sub Option 3-2 selected") },
    ],
  },
];