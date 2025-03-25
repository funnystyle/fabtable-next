import { Button, Flex, Form, Input, Radio, Tooltip, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const { Title } = Typography;

const CsAsDetailForm = ({ form, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon, index }) => {

  const { recordKeys:keys } = useCsCreateConstantStore();


  const handleReset = () => {
    form.resetFields([
      `poorSN1-${index+1}`,
      `inout1-${index+1}`,
      `actionContents1-${index+1}`,
      `day-${index+1}`,
      `step-${index+1}`,
      `flow-${index+1}`,
      `usePress-${index+1}`,
      `customerSpec-${index+1}`,
      `productSpec-${index+1}`,
    ]);
  }

  return (
    <div className="info-input-box" key={`cs-detail-${index}`}>
      <Flex
        align="center"
        gap={12}
        justify="space-between"
        className="title-area"
      >
        <Flex align="center" gap={4}>
          <Title
            level={4}
            className="title-bullet"
            style={{
              marginBottom: "0",
            }}
          >
            {isCommon ? "공통" : `제품 ${index + 1}`}
          </Title>

          {isCommon && (
            <>
              <Tooltip title="CS 넘버 내에 속한 모든 제품에 동일한 내용이 적용됩니다.">
                <InfoCircleOutlined />
              </Tooltip>

              <p className="total-num">
                총 <strong>{keys.length}</strong>개 제품에 동일하게 적용
              </p>
            </>
          )}
        </Flex>

        <Button type="text" className="btn-all-reset"
                onClick={() => handleReset()}
        >
          초기화
        </Button>
      </Flex>

      <Form form={form} layout="vertical" className="info-input-area flex-w-none">
        <Flex gap={4}>
          <Form.Item
            label="불량제품 S/N"
            name={`poorSN1-${index+1}`}
            style={{
              width: "180px",
            }}
          >
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="Warranty" name={`inout1-${index+1}`}>
            <Radio.Group>
              <Radio value="in">IN</Radio>
              <Radio value="out">OUT</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="조치내용 (요약)" name={`actionContents1-${index+1}`}>
            <Input placeholder="-" />
          </Form.Item>
        </Flex>
      </Form>

      <Form layout="vertical" className="info-input-area">
        <Flex gap={4}>
          <Form.Item label="대응기간(Day)" name={`day-${index+1}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="공정 Step/Recipe" name={`step-${index+1}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="Flow Sequence" name={`flow-${index+1}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="사용압력" name={`usePress-${index+1}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="고객사 Spec" name={`customerSpec-${index+1}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="제조 Spec" name={`productSpec-${index+1}`}>
            <Input placeholder="-" />
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
}

export default CsAsDetailForm;