import {Button, Flex, Form} from "antd";
import React from "react";
import ModalBox from "@components/modal/ModalBox";

const ModalBoxRow = ({form, codeRelationSet, selectedCodes, setSelectedCodes, itemList}) => {

  const handleReset = () => {
    let nameList = [];
    itemList.forEach(item => {
      const componentsList = item[0].components;
      componentsList.forEach(components => {
        components.forEach(component => {
          nameList.push(component.recordColumn.name)
        });
      });
    })

    form.resetFields(nameList);
  }

  return (
    <>
      <Flex align="center" gap={4} className="tit-area">
        <p className="tit-type">{itemList[0][0].displayName}</p>

        <Button type="link" className="btn-reset-txt" onClick={() => handleReset()}>초기화</Button>
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