import { Button, Flex, Form, Typography } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";
import {handleComponentInputName} from "@components/inputForm/handleComponentInputName";

const { Title } = Typography;

export const handleInputBox = (form, codeRelationSet, selectedCodes, setSelectedCodes, item, index) => {

  // item.subDisplayName이 있을 경우 타이틀 표시
  if (item.length === 1) {
    const componentsList = item[0].components;

    const handleReset = () => {
      const nameList = [];

      // `componentsList.map()`을 사용하여 name 수집
      componentsList.forEach((components) => {
        // name 생성
        components.forEach((component) => {
          const name = handleComponentInputName(component.recordColumn);
          nameList.push(name);
        });
      });

      form.resetFields(nameList);
    }

    return (
      <div className="info-input-box" key={`input-box-${index}`}>
        {item[0].subDisplayName && (
          <Flex justify="space-between">
            <Title level={5} className="title-bullet">{item[0].subDisplayName}</Title>

            <Button type="text" className="btn-all-reset" onClick={() => handleReset()}>
            초기화
            </Button>
          </Flex>
        )}

        <Form form={form} layout="vertical" className="info-input-area">
          {componentsList.map((components, index) => handleInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components, index))}
        </Form>
      </div>
    );
  } else {
    const handleInputBox = (box, index) => {
      const componentsList = box.components;

      const handleReset = () => {
        const nameList = [];

        // `componentsList.map()`을 사용하여 name 수집
        componentsList.forEach((components) => {
          // name 생성
          components.forEach((component) => {
            const name = handleComponentInputName(component.recordColumn);
            nameList.push(name);
          });
        });

        form.resetFields(nameList);
      }

      return (
        <React.Fragment key={`record-fragment-${index}`}>
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
            {componentsList.map((components, index) => handleInputComponentRow(form, codeRelationSet, selectedCodes, setSelectedCodes, components, index))}
            </Form>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="row-2" key={`input-box-${index}`}>
        {item.map((box, index) => handleInputBox(box, index))}
      </div>
    );
  }
}