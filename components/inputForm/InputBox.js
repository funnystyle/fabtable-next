import { Button, Checkbox, Flex, Form, Typography } from "antd";
import InputComponent from "@components/inputForm/InputComponent";
import { SettingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import InputComponentRow from "@components/inputForm/InputComponentRow";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";
import useSyncRequesterToVisitor from "@components/cs/create/hook/useSyncRequesterToVisitor";

const { Title } = Typography;

const InputBox = ({ form, codeRelationSet, item, index }) => {

// 상태
  const [isSame, setIsSame] = useState(false);

// 훅
  useSyncRequesterToVisitor(form, isSame);

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
            <Title level={5}>{item[0].subDisplayName}</Title>

            <Button type="text" className="btn-all-reset" onClick={() => handleReset()}>
              초기화
            </Button>
          </Flex>
        )}

        <Form form={form} layout="vertical" className="info-input-area">
          {componentsList.map((components, index) =>
            <InputComponentRow
              key={`input-component-row-${index}`}
              form={form}
              codeRelationSet={codeRelationSet}
              components={components}
              index={index}
            />
          )}
        </Form>
      </div>
    );
  } else {
    const InputBox = (box, index) => {
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
          <div className="info-input-box">
            {box.subDisplayName && (
              <Flex justify="space-between">
                <Flex gap={12} align="center">
                <Title level={5}>{box.subDisplayName}</Title>

                {box.subDisplayName === "내방 정보" && (
                  <Checkbox
                    onChange={(e) => setIsSame(e.target.checked)}
                    value="same"
                  >
                    요청자 정보와 동일
                  </Checkbox>
                )}
                </Flex>

                <Button type="text" className="btn-all-reset" onClick={() => handleReset()}>
                  초기화
                </Button>
              </Flex>
            )}

            <Form form={form} layout="vertical" className="info-input-area">
              {componentsList.map((components, index) =>
                <InputComponentRow
                  key={`input-component-row-${index}`}
                  form={form}
                  codeRelationSet={codeRelationSet}
                  components={components}
                  index={index}
                />
              )}
            </Form>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="row-2" key={`input-box-${index}`}>
        {item.map((box, index) => InputBox(box, index))}
      </div>
    );
  }
}

export default InputBox;