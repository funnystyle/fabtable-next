// pages/order/create/index.js
import React from "react";
import {Button, message, Modal,} from "antd";
import useRecordDataStore from "@store/useRecordDataStore";

const OrderCreateCopyButton = () => {

  const {setIsCopy, isChange, record} = useRecordDataStore();

  const onClick = () => {
    if (isChange) {
      Modal.confirm({
        title: "변경된 내용이 있습니다.",
        content: "저장하지 않고 복제하시겠습니까?",
        onOk: () => {
          setIsCopy(true);
          message.success("복제 완료");
        },
      });
    } else {
      setIsCopy(true);
      message.success("복제 완료");
    }
  };

  return (
    <Button onClick={onClick}>복제</Button>
  );
};

export default OrderCreateCopyButton;
