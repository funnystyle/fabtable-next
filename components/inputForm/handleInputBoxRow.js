import { Button, Flex, Typography } from "antd";
import { RedoOutlined, SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputBox } from "@components/inputForm/handleInputBox";

const { Title } = Typography;

export const handleInputBoxRow = (form, codeRelationSet, itemList, index, type) => {

  return (
    <React.Fragment key={`input-box-row-${index}`}>
    <div id={`${type}-anchor-${itemList[0][0].name}`} key={`input-box-row-${index}`}>
        <div className="info-area">
          <Flex
            align="center"
            justify="space-between"
            className="info-title-area"
          >
            <Title level={3} className="title-bullet">
              {itemList[0][0].displayName}
            </Title>

            <Flex gap={10}>
              <Button
                icon={<RedoOutlined />}
                size="small"
                className="ico-rotate"
              />

              <Button icon={<SettingOutlined />} size="small" />
            </Flex>
          </Flex>

          <Flex gap={16} className="info-input-col2">
            {itemList.map((item, index) => handleInputBox(form, codeRelationSet, item, index))}
          </Flex>
        </div>
      </div>
      <div className="info-wrap-last" />
    </React.Fragment>
  );
}