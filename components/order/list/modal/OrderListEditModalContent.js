import {Button, Flex} from "antd";
import React, {useEffect, useState} from "react";
import {handleCopyModalBoxRow} from "@components/list/handleCopyModalBoxRow";
import {useQuery} from "@tanstack/react-query";
import {getAxios} from "@api/apiClient";

const OrderListEditModalContent = ({ form, selectKeysLength }) => {

  const handleReset = () => {
    form.resetFields();
  };

  const [list, setList] = useState([]);

  const [queryKey, setQueryKey] = useState(["input-box-list", "recordListEditModal", Math.random()]);
  const { data:editModalBoxResponse, isSuccess } = useQuery({
    queryKey,
    queryFn: () => getAxios("/user/input-box", {type:"recordListEditModal"}),
  });
  useEffect(() => {
    if (isSuccess) {
      setList(editModalBoxResponse.data.list);
    }
  }, [isSuccess]);

  return (
    <>
      <Flex align="center" justify="space-between">
        <p className="total-txt">
          총 <strong>{selectKeysLength}</strong> 건
        </p>

        <Button type="link" className="btn-reset-txt" onClick={handleReset}>
          입력 초기화
        </Button>
      </Flex>

      {list.map((item, index) => handleCopyModalBoxRow(form, item, index))}
    </>
  );
}

export default OrderListEditModalContent;