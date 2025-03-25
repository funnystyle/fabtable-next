import { Button, Checkbox, Flex, Form, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import CsRecordInputComponentRow from "@components/inputForm/cs/CsRecordInputComponentRow";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const { Title } = Typography;

const CsRecordInputBox = ({ form, codeRelationSet, item, index, index2 }) => {

  const { recordKeys, setRecordKeys, checkedKeySet, setCheckedKeySet } = useCsCreateConstantStore();


  const handleDeleteCsRecord = (index) => {
    const newRecordKeys = recordKeys.filter((_, idx) => idx !== index);
    setRecordKeys(newRecordKeys);
  }

  const handleCheckboxChange = (e, currentIndex) => {
    const newSet = new Set(checkedKeySet); // 기존 Set을 복사하여 새로운 Set 생성
    if (e.target.checked) {
      newSet.add(currentIndex);
    } else {
      newSet.delete(currentIndex);
    }
    setCheckedKeySet(newSet);
  };

  // item.subDisplayName이 있을 경우 타이틀 표시
  if (item.length === 1) {
    const componentsList = item[0].components;

    const handleReset = () => {
      const nameList = [];

      // `componentsList.map()`을 사용하여 name 수집
      componentsList.forEach((components) => {
        // name 생성
        components.forEach((component) => {
          const name = handleComponentInputName(component.recordColumn, index);
          nameList.push(name);
        });
      });

      form.resetFields(nameList);
    }

    return (
      <div className="info-input-box" key={`cs-record-${index}-${index2}`}>
        {item[0].subDisplayName && (
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={12} className="title-area">
              <Title level={4} className="title-bullet" style={{ marginBottom: "0", }}>{`제품 ${index + 1}`}</Title>

              <Checkbox
                checked={checkedKeySet.has(index)}
                onChange={(e) => handleCheckboxChange(e, index)}
              />

              <Flex gap={4} className="tit-side-area">
                <Button color="primary" variant="outlined" size="small">
                  수주 종합정보
                </Button>

                <Button icon={<DeleteOutlined />} size="small"
                  onClick={() => handleDeleteCsRecord(index)}
                />
              </Flex>
            </Flex>

            <Button type="text" className="btn-all-reset"
            onClick={() => handleReset()}
            >
            초기화
            </Button>
          </Flex>
        )}

        <Form form={form} layout="vertical" className="info-input-area">
          {componentsList.map((components, i) => <CsRecordInputComponentRow key={`cs-record-input-component-${i}`} form={form} codeRelationSet={codeRelationSet} components={components} index={index} />)}
        </Form>
      </div>
    );
  } else {
    const handleInputBox = (box, index) => {
      const componentsList = box.components;

      return (
        <>
          {index !== 0 && <div className="info-box-row-wrap"/> }
          <div className="info-input-box">
            {box.subDisplayName && (
              <Flex justify="space-between">
                <Title level={5}>{box.subDisplayName}</Title>

                <Button type="text" className="btn-all-reset" onClick={() => handleReset()}>
                  초기화
                </Button>
              </Flex>
            )}

            <Form form={form} layout="vertical" className="info-input-area">
              {componentsList.map((components, i) => <CsRecordInputComponentRow key={`cs-record-input-component-${i}`} form={form} codeRelationSet={codeRelationSet} components={components} index={index} />)}
            </Form>
          </div>
        </>
      );
    }

    return (
      <div className="row-2" key={`cs-record-${index}-${index2}`}>
        {item.map((box, index) => handleInputBox(box, index))}
      </div>
    );
  }
}

export default CsRecordInputBox;