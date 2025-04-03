import { Button, Flex, Form, Typography } from "antd";
import React from "react";
import CsRecordInputComponentRowInitial from "@components/inputForm/cs/CsRecordInputComponentRowInitial";
import useCsCreateLoadRecordModalStore from "@store/useCsCreateLoadRecordModalStore";

const { Title } = Typography;

const CsRecordInputBoxInitial = ({ item, index }) => {

  const { setOpenSearchModal, setIndex, setOpenDiv } = useCsCreateLoadRecordModalStore();

  const componentsList = item[0].components;
  
  return (
    <div className="info-input-box">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={12} className="title-area">
          <Title level={5} style={{ marginBottom: "0", }}>{`제품 ${index}`}</Title>

          <Flex gap={4} className="tit-side-area">
            <Button type="primary" size="small" onClick={() => {
              setIndex(index);
              setOpenDiv("defect");
              setOpenSearchModal(true);
            }}>불량제품 불러오기</Button>
          </Flex>
        </Flex>
      </Flex>

      <Form layout="vertical" className="info-input-area">
        {componentsList.map((components, i) => <CsRecordInputComponentRowInitial key={`cs-record-input-component-${i}`} components={components} index={0} />)}
      </Form>
    </div>
  );
}

export default CsRecordInputBoxInitial;