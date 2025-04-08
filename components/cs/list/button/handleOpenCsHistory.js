import { message, } from "antd";

export const handleOpenCsHistory = (length, modalStore) => {
  const { setOpenSearchModal } = modalStore.getState();

  if (length > 1) {
    message.warning("이력 조회는 1개만 가능합니다.");
    return;
  }
  setOpenSearchModal(true);
}