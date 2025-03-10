import { Button, Flex, Form, Typography } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";

const { Title } = Typography;

export const handleInputBox = (form, codeRelationSet, selectedCodes, setSelectedCodes, item) => {

  // item.subDisplayName이 있을 경우 타이틀 표시
  if (item.length === 1) {
    const componentsList = item[0].components;
    console.log(item);
    return (
      <div className="info-input-box">
        {item[0].subDisplayName && (
          <Flex justify="space-between">
            <Title level={5} className="title-bullet">{item[0].subDisplayName}</Title>

            <Button type="text" className="btn-all-reset">
            초기화
            </Button>
          </Flex>
        )}

        <Form form={form} layout="vertical" className="info-input-area">
          {componentsList.map((components) => handleInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components))}
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
            {componentsList.map((components) => handleInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components))}
            </Form>
          </div>
        </>
      );
    }

    return (
      <div className="row-2">
        {item.map((box, index) => handleInputBox(box, index))}
      </div>
    );
  }
}