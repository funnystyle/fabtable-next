// pages/order/create/index.js
import React from "react";
import {Button, Modal,} from "antd";
import useMenuTabStore from "@store/useMenuTabStore";
import useRecordDataStore from "@store/useRecordDataStore";
import {useDeleteRecord} from "@components/api/useDeleteRecord";

const OrderCreateDeleteButton = ({handleReset}) => {

  const {moveUrl} = useMenuTabStore();
  const handleDeleteSuccess = () => {
    moveUrl("/order/list");
    handleReset();
  }

  const {record} = useRecordDataStore();
  const {mutate: deleteRecord} = useDeleteRecord(handleDeleteSuccess);

  const handleDelete = () => {
    Modal.confirm({
      title: "등록된 내용을 삭제하시겠습니까?",
      content: "삭제 후에는 복구할 수 없습니다.",
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
