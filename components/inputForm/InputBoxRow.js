import { Button, Flex, Typography } from "antd";
import { RedoOutlined, SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputBox } from "@components/inputForm/handleInputBox";
import {handleComponentInputName} from "@components/inputForm/handleComponentInputName";
import useRecordDataStore from "@store/useRecordDataStore";

const { Title } = Typography;

const InputBoxRow = ({ form, codeRelationSet, itemList, index, type }) => {

  const { handleReset:reset, record, setRecord } = useRecordDataStore();

  const handleReset = () => {
    const nameList = [];

    itemList.forEach((item) => {
      item.forEach((box) => {
        box.components.forEach((components) => {
          components.forEach((component) => {
            const name = handleComponentInputName(component.recordColumn);
            nameList.push(name);
          });
        });
      });
    });

    form.resetFields(nameList);

    const newRecord = { ...record };
    nameList.forEach((name) => {
      newRecord[name] = null;
    });

    setRecord(newRecord);
  }


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
                onClick={() => handleReset()}
              />

              {/*<Button icon={<SettingOutlined />} size="small" />*/}
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

export default InputBoxRow;