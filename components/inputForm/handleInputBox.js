import { Button, Flex, Form, Typography } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";

const { Title } = Typography;

export const handleInputBox = (form, codeRelationSet, selectedCodes, setSelectedCodes, item) => {
  const componentsList = item.components;

  // item.subDisplayName이 있을 경우 타이틀 표시
  return (
    <div className="info-input-box">
      {item.subDisplayName && (
        <Title level={5}>{item.subDisplayName}</Title>
      )}


      <Form form={form} layout="vertical" className="info-input-area">
        {componentsList.map((components) => handleInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components))}
      </Form>
    </div>
  );
}