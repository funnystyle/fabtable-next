import {Button, Flex} from "antd";
import React, {useEffect, useState} from "react";
import {handleCopyModalBoxRow} from "@components/list/handleCopyModalBoxRow";
import {useQuery} from "@tanstack/react-query";
import {getAxios} from "@api/apiClient";

const OrderListCopyModalContent = ({ form, selectKeysLength }) => {

  const handleReset = () => {
    form.resetFields();
  };

  const [list, setList] = useState([]);

  const [queryKey, setQueryKey] = useState(["input-box-list", "recordListCopyModal", Math.random()]);
  const { data:copyModalBoxResponse, isSuccess } = useQuery({
    queryKey,
    queryFn: () => getAxios("/user/input-box", {type:"recordListCopyModal"}),
  });
  useEffect(() => {
    if (isSuccess) {
      setList(copyModalBoxResponse.data.list);
    }
  }, [isSuccess]);

  return (
    <>
      <Flex align="center" justify="space-between">
        <p className="total-txt">
          선택 총 <strong>{selectKeysLength}</strong> 건
        </p>

        <Button type="link" className="btn-reset-txt" onClick={handleReset}>
          입력 초기화
        </Button>
      </Flex>

      <p className="modal-txt">복수의 수주 복제 시 수량을 꼭 확인하세요.</p>

      {list.map((item, index) => handleCopyModalBoxRow(form, item, index))}
    </>
  );
}

export default OrderListCopyModalContent;