import { Button, Checkbox, Flex, Form, Typography } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";
import { handleCsRecordInputComponentRow } from "@components/inputForm/cs/handleCsRecordInputComponentRow";

const { Title } = Typography;

export const handleCsRecordInputBox = (form, codeRelationSet, selectedCodes, setSelectedCodes, item, index, recordKeys, setRecordKeys, checkedKeySet, setCheckedKeySet, index2) => {

  // recordKeys에서 index를 빼야해
  const handleDeleteCsRecord = (index) => {
    const newRecordKeys = recordKeys.filter((_, idx) => idx !== index);
    setRecordKeys(newRecordKeys);
  }

  const handleCheckboxChange = (e, currentIndex) => {
    setCheckedKeySet((prevSet) => {
      const newSet = new Set(prevSet); // 기존 Set을 복사하여 새로운 Set 생성
      if (e.target.checked) {
        newSet.add(currentIndex);
      } else {
        newSet.delete(currentIndex);
      }
      return newSet; // 새로운 Set 객체로 업데이트해야 React가 상태 변경을 감지함
    });
  };

  // item.subDisplayName이 있을 경우 타이틀 표시
  if (item.length === 1) {
    const componentsList = item[0].components;
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

            <Button type="text" className="btn-all-reset">
            초기화
            </Button>
          </Flex>
        )}

        <Form form={form} layout="vertical" className="info-input-area">
          {componentsList.map((components, index3) => handleCsRecordInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components, index, index3))}
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

                <Button type="text" className="btn-all-reset">
                  초기화
                </Button>
              </Flex>
            )}

            <Form form={form} layout="vertical" className="info-input-area">
            {componentsList.map((components, index3) => handleCsRecordInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components, index, index3))}
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