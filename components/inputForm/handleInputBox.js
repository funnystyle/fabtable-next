import { Button, Flex, Form, Typography } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";

const { Title } = Typography;

export const handleInputBox = (form, codeRelationSet, selectedCodes, setSelectedCodes, item) => {
  const componentsList = item.components;

  return (
    <div className="info-input-box">
      <Form form={form} layout="vertical" className="info-input-area">
        {componentsList.map((components) => handleInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components))}
      </Form>
    </div>
  );
}