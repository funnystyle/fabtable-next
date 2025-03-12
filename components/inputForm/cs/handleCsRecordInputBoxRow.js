import { Button, Flex, InputNumber, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { handleInputBox } from "@components/inputForm/handleInputBox";
import { handleCsRecordInputBox } from "@components/inputForm/cs/handleCsRecordInputBox";

const { Title } = Typography;

export const handleCsRecordInputBoxRow = (form, codeRelationSet, selectedCodes, setSelectedCodes, itemList, recordKeys, setRecordKeys, checkedKeySet, setCheckedKeySet, copyCountRef, index) => {

  const handleCopy = () => {
    const copyCount = copyCountRef.current.value || 1;

    for (let i = 0; i < copyCount; i++) {
      const copyRecordKeys = Array.from(checkedKeySet).map((key) => recordKeys[key]);

      setRecordKeys((prevKeys) => [...prevKeys, ...copyRecordKeys]);
    }
  };

  const handleDelete = () => {
    const newRecordKeys = recordKeys.filter((_, idx) => !checkedKeySet.has(idx));
    setRecordKeys(newRecordKeys);
  }

  // 복사 버튼 클릭 시
  return (
    <div key={`cs-record-input-box-${index}`}>
      <div id={itemList[0][0].name}>
        <Flex
          align="center"
          justify="space-between"
          className="info-title-area"
        >
          <Flex align="center" gap={8}>
            <Title level={3} className="title-bullet">
              {itemList[0][0].displayName}
            </Title>

            <Flex align="center" gap={4} className="tit-side-area">
              <InputNumber
                min={1}
                max={10}
                defaultValue={3}
                ref={copyCountRef}
                // onChange={onChange}
              />

              <Button
                type="primary"
                icon={<PlusOutlined />}
                iconPosition={"end"}
                onClick={() => handleCopy()}
              >
                제품 추가
              </Button>

              <Button icon={<DeleteOutlined />}
                      iconPosition={"end"}
                onClick={() => handleDelete()}
              >
                삭제
              </Button>

              <p className="total-num">
                총 <strong>2</strong> 개
              </p>
            </Flex>
          </Flex>

          <Flex gap={10}>
            <Button
              icon={<RedoOutlined />}
              size="small"
              className="ico-rotate"
            />

            <Button icon={<SettingOutlined />} size="small" />
          </Flex>
        </Flex>

        {recordKeys.map((key, index) => (
          <React.Fragment key={`record-fragment-${key}-${index}`}>
            {index > 0 && (<div style={{marginTop: '1.75rem'}} />)}
            <Flex gap={20} className="info-input-col2" key={`record-${key}`}>
              {itemList.map((item, index2) => handleCsRecordInputBox(form, codeRelationSet, selectedCodes, setSelectedCodes, item, index, recordKeys, setRecordKeys, checkedKeySet, setCheckedKeySet, index2))}
            </Flex>
          </React.Fragment>
        ))}
      </div>
      <div className="info-wrap" />
    </div>
  );
}