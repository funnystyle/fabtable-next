// pages/order/create/index.js
import { message, } from "antd";

export const handleCsCopy = (keyStore, moveUrl, dataStore, router) => {
  const { datas } = keyStore.getState();
  const { setCs, setIsCopy } = dataStore.getState();

  if (datas.length <= 0) {
    message.error("선택된 C/S가 없습니다.");
    return;
  }
  if (datas.length > 1) {
    message.error("1개의 행만 선택하세요.");
    return;
  }
  setCs({ ...datas[0] });
  setIsCopy(true);
  moveUrl("/cs/create");
  router.push("/cs/create");
}
