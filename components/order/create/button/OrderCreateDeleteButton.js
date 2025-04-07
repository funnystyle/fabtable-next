// pages/order/create/index.js
import React from "react";
import {Button, Modal,} from "antd";
import useMenuTabStore from "@store/useMenuTabStore";
import useRecordDataStore from "@store/useRecordDataStore";
import {useDeleteRecord} from "@components/api/useDeleteRecord";
import {transformTagDataSingle} from "@components/order/table/transformTagData";

const OrderCreateDeleteButton = ({form, handleReset}) => {
  const { record, setRecord, nowState, setNowState, tagInfoList, serialNumber, isChange, setIsCopy, setIsChange } = useRecordDataStore();

  const {moveUrl} = useMenuTabStore();
  const handleDeleteSuccess = () => {
    moveUrl("/order/list");
    setIsCopy(false);
    setIsChange(false);
    form.resetFields();
    setRecord({});
  }

  const {mutate: deleteRecord} = useDeleteRecord(handleDeleteSuccess);

  const handleDelete = () => {
    Modal.confirm({
      title: "삭제하기",
      content: "등록된 내용을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.",
      onOk: () => {
        deleteRecord({id: record.id});
      },
    });
  }

  return (
    <Button onClick={handleDelete}>삭제</Button>
  );
};

export default OrderCreateDeleteButton;
