import React, { useEffect, useState } from "react";
import ModalBoxRow from "@components/modal/ModalBoxRow";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const OrderOpenModalContent = ({ form }) => {

  const codeRelationSet = new Set();
  const [selectedCodes, setSelectedCodes] = useState([]); // 선택된 코드 상태 저장
  const [list, setList] = useState([]);

  const [queryKey, setQueryKey] = useState(["input-box-list", "recordCreateOpenModal", Math.random()]);
  const { data, isSuccess } = useQuery({
  	queryKey,
  	queryFn: () => getAxios("/user/input-box", {type:"recordCreateOpenModal"}),
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

      {/*<Flex align="center" gap={4} className="tit-area">*/}
      {/*  <p className="tit-type">C/S 검색</p>*/}

      {/*  <Button type="link" className="btn-reset-txt">*/}
      {/*    초기화*/}
      {/*  </Button>*/}
      {/*</Flex>*/}

      {/*<Form layout="vertical" className="modal-input-area">*/}
      {/*  <Flex gap={8}>*/}
      {/*    <Form.Item label="시리얼 번호" name="serial-num">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item label="제조 번호" name="product-num">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item label="C/S 번호" name="cs-num">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*  </Flex>*/}
      {/*</Form>*/}
    </>
  );
}

export default OrderOpenModalContent;