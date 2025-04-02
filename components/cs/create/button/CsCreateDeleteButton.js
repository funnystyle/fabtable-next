// pages/order/create/index.js
import React from "react";
import {Button, Modal,} from "antd";
import useCsDataStore from "@store/useCsDataStore";
import {useDeleteCs} from "@components/api/useDeleteCs";
import useMenuTabStore from "@store/useMenuTabStore";

const CsCreateDeleteButton = ({handleReset}) => {

  const {moveUrl} = useMenuTabStore();
  const handleDeleteSuccess = () => {
    moveUrl("/cs/list");
    handleReset();
  }

  const {cs} = useCsDataStore();
  const {mutate: deleteCs} = useDeleteCs(handleDeleteSuccess);

  const handleDelete = () => {
    Modal.confirm({
      title: "등록된 내용을 삭제하시겠습니까?",
      content: "삭제 후에는 복구할 수 없습니다.",
      onOk: () => {
        deleteCs({id: cs.id});

      },
    });
  }

  return (
    <Button onClick={handleDelete}>삭제</Button>
  );
};

export default CsCreateDeleteButton;
