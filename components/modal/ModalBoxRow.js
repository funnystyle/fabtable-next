import {Flex, Form} from "antd";
import React from "react";
import ModalBox from "@components/modal/ModalBox";

const ModalBoxRow = ({form, codeRelationSet, selectedCodes, setSelectedCodes, itemList}) => {
  return (
    <>
      <Flex align="center" gap={4} className="tit-area">
        <p className="tit-type">{itemList[0][0].displayName}</p>
      </Flex>

      <Form form={form} layout="vertical" className="info-input-area modal-input-area">
        {itemList.map((item, i) =>
          <ModalBox
            key={`modal-box-${i}`}
            form={form}
            codeRelationSet={codeRelationSet}
            selectedCodes={selectedCodes}
            setSelectedCodes={setSelectedCodes}
            item={item}
          />
        )}
      </Form>
    </>
  );
}

export default ModalBoxRow