export const showDrawer = (type, handleReload, keyStore, drawerStore, pdfUrlStore, docxUrlStore) => {
  const { setOpenDrawer, setSelectedPrint, setLabelContent } = drawerStore.getState();
  const { setPdfUrlList } = pdfUrlStore.getState();
  const { setDocxUrlList } = docxUrlStore.getState();
  setSelectedPrint(type);
  setLabelContent(""); // 초기화

  setPdfUrlList([]); // 초기화

  setDocxUrlList([]); // 초기화

  const { selectedRowKeys } = keyStore.getState();
  if (type === "report") {
    handleReload(selectedRowKeys);
  }

  setOpenDrawer(true);
};
