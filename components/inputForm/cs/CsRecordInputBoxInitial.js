import { Button, Flex, Form, Typography } from "antd";
import React, { useEffect } from "react";
import CsRecordInputComponentRowInitial from "@components/inputForm/cs/CsRecordInputComponentRowInitial";
import useCsCreateLoadRecordModalStore from "@store/useCsCreateLoadRecordModalStore";
import { csRecordInputs } from "@components/inputForm/cs/data/csRecordInputs";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CsRecordInputBoxInitial = ({ form, item, index=1 }) => {

  const { recordKeys, setRecordKeys, subRecordKeys, setSubRecordKeys, checkedKeySet, setCheckedKeySet } = useCsCreateConstantStore();
  const { setOpenSearchModal, setIndex, setOpenDiv } = useCsCreateLoadRecordModalStore();

  const componentsList = item[0].components;

  const handleDeleteCsRecord = (index) => {
    csRecordInputs.forEach((field) => {
      for (let i = index + 1; i <= recordKeys.length; i++) {
        form.setFieldValue(`${field}-${i - 1}`, form.getFieldValue(`${field}-${i}`));
      }
    });

    const newRecordKeys = recordKeys.filter((_, idx) => idx + 1 !== index);
    setRecordKeys(newRecordKeys);
    const newSubRecordKeys = subRecordKeys.filter((_, idx) => idx + 1 !== index);
    setSubRecordKeys(newSubRecordKeys);
  }

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

          {index > 0 && recordKeys.length > 1 &&
          <Button icon={<DeleteOutlined />} size="small"
                  onClick={() => handleDeleteCsRecord(index)}
          />
          }
        </Flex>
      </Flex>

      <Form layout="vertical" className="info-input-area">
        {componentsList.map((components, i) => <CsRecordInputComponentRowInitial key={`cs-record-input-component-${i}`} components={components} index={0} />)}
      </Form>
    </div>
  );
}

export default CsRecordInputBoxInitial;