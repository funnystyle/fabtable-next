import {Flex, Form} from "antd";
import React from "react";
import {handleCopyModalComponentRow} from "@components/list/handleCopyModalComponentRow";
import {handleCopyModalBox} from "@components/list/handleCopyModalBox";

export const handleCopyModalBoxRow = (form, itemList, index) => {
  return (
    <div key={`box-row-${index}`}>
      <Flex align="center" gap={4} className="tit-area">
        <p className="tit-type">{itemList[0].name}</p>
      </Flex>

      <Form form={form} layout="vertical" className="modal-input-area">
        {itemList.map((item, i) => handleCopyModalBox(form, item, i))}
      </Form>
    </div>
  );
}