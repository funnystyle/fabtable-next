// pages/order/create/index.js
import React from "react";
import { Button, message, } from "antd";
import useCsDataStore from "@store/useCsDataStore";
import useMenuTabStore from "@store/useMenuTabStore";
import { useRouter } from "next/router";
import useTableSelectKeysCsListStore from "@store/useTableSelectKeysCsListStore";

const CsCopyButton = () => {

  const { datas } = useTableSelectKeysCsListStore();
  const { moveUrl } = useMenuTabStore();
  const { setCs, setIsCopy } = useCsDataStore();
  const router = useRouter();

  const onClick = () => {
    if (datas.length <= 0) {
      message.error("선택된 C/S가 없습니다.");
      return;
    }
    if (datas.length > 1) {
      message.error("1개의 행만 선택하세요.");
      return;
    }
    setCs({...datas[0]});
    setIsCopy(true);
    moveUrl("/cs/create");
    router.push("/cs/create");
  }
  return (
    <Button onClick={onClick}>C/S 복제하기</Button>
  );
};

export default CsCopyButton;
