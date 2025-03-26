import React, { useEffect, useState } from "react";
import ModalBoxRow from "@components/modal/ModalBoxRow";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const OrderOpenModalContent = ({ form, searchLocation }) => {
  const type = searchLocation === "order" ? "recordCreateOpenModal" : "csCreateOpenModal";
  const codeRelationSet = new Set();
  const [selectedCodes, setSelectedCodes] = useState([]); // 선택된 코드 상태 저장
  const [list, setList] = useState([]);

  const [queryKey, setQueryKey] = useState(["input-box-list", type, Math.random()]);
  const { data, isSuccess } = useQuery({
  	queryKey,
  	queryFn: () => getAxios("/user/input-box", {type}),
  });

  useEffect(() => {
  	if (isSuccess) {
  		setList(data.data.list);
  	}
  }, [isSuccess]);

  return (
    <>
      {list.map((itemList, i) =>
        <ModalBoxRow
          key={`modal-box-row-${i}`}
          form={form}
          codeRelationSet={codeRelationSet}
          selectedCodes={selectedCodes}
          setSelectedCodes={setSelectedCodes}
          itemList={itemList}
          />
      )}
    </>
  );
}

export default OrderOpenModalContent;