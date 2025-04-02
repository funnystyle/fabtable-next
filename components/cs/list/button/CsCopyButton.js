// pages/order/create/index.js
import React from "react";
import {Button, Flex, message,} from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import useCsDataStore from "@store/useCsDataStore";
import OrderListButtonStatusChange from "@components/order/list/button/OrderListButtonStatusChange";
import {useSetCsState} from "@components/api/useSetCsState";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";
import useMenuTabStore from "@store/useMenuTabStore";

const CsCopyButton = () => {

  const { datas } = useTableSelectKeysStore();
  const { moveUrl } = useMenuTabStore();
  const { setCs } = useCsDataStore();

  const onClick = () => {
    if (datas.length <= 0) {
      message.error("선택된 C/S가 없습니다.");
      return;
    }
    setCs({...datas[0], isCopy: true});
    console.log("aaaa",{...datas[0], isCopy: true});
    moveUrl("/cs/create");
  }
  return (
    <Button onClick={onClick}>C/S 복제하기</Button>
  );
};

export default CsCopyButton;
