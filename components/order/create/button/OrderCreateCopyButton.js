// pages/order/create/index.js
import React from "react";
import {Button, message, Modal,} from "antd";
import useRecordDataStore from "@store/useRecordDataStore";
import { transformTagDataSingle } from "@components/order/table/transformTagData";

const OrderCreateCopyButton = ({form}) => {

  const {setIsCopy, isChange, record, setRecord, setNowState, tagInfoList} = useRecordDataStore();

  const onClick = () => {
    if (isChange) {
      Modal.confirm({
        title: "복제하기",
        content: "변경된 데이터가 있습니다.  내용을 저장하지 않고 복제할까요? ",
        onOk: () => {
          setIsCopy(true);
          setNowState(transformTagDataSingle(tagInfoList, "발주기입"));
          record.remark = "";
          record.salesTeamMemo = "";
          setRecord(record);
          form.resetFields(["remark", "salesTeamMemo"]);
          message.success("복제 완료");
        },
      });
    } else {
      Modal.confirm({
        title: "복제하기",
        content: "동일한 내용으로 복제합니다.",
        onOk: () => {
          setIsCopy(true);
          setNowState(transformTagDataSingle(tagInfoList, "발주기입"));
          record.remark = "";
          record.salesTeamMemo = "";
          setRecord(record);
          form.resetFields(["remark", "salesTeamMemo"]);
          message.success("복제 완료");
        },
      });
    }
  };

  return (
    <Button onClick={onClick}>복제</Button>
  );
};

export default OrderCreateCopyButton;
