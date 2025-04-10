import { Button, Flex, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputBox } from "@components/inputForm/handleInputBox";

const { Title } = Typography;

export const handleInputBoxRow = (form, codeRelationSet, selectedCodes, setSelectedCodes, itemList) => {

  return (
    <div>
      <div id={itemList[0][0].name}>
        <div className="info-area">
          <Flex
            align="center"
            justify="space-between"
            className="info-title-area"
          >
            <Title level={3} className="title-bullet">
              {itemList[0][0].displayName}
            </Title>

            <Button icon={<SettingOutlined />} size="small" />
          </Flex>

          <Flex gap={20} className="info-input-col2">
            {itemList.map((item) => handleInputBox(form, codeRelationSet, selectedCodes, setSelectedCodes, item))}
          </Flex>
        </div>
      </div>
      <div className="info-wrap" />
    </div>
  );
}