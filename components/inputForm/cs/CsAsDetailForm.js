import { Button, Flex, Form, Input, Radio, Tooltip, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const { Title } = Typography;

const CsAsDetailForm = ({ form, index }) => {

  const { recordKeys:keys, isAsDetailCommon:isCommon} = useCsCreateConstantStore();

  const handleReset = () => {
    form.resetFields([
      `defectMfcSN-${index}`,
      `warranty-${index}`,
      `actionSummary-${index}`,
      `responsePeriod-${index}`,
      `processStep-${index}`,
      `flowSequence-${index}`,
      `usePressure-${index}`,
      `customerSpec-${index}`,
      `manufactureSpec-${index}`,
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
            {isCommon ? "공통" : `제품 ${index}`}
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
            name={`defectMfcSN-${index}`}
            style={{
              width: "180px",
            }}
          >
            <Input placeholder="-" readOnly={index !== 0}/>
          </Form.Item>

          <Form.Item label="Warranty" name={`warranty-${index}`}>
            <Radio.Group>
              <Radio value="in">IN</Radio>
              <Radio value="out">OUT</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="조치내용 (요약)" name={`actionSummary-${index}`}>
            <Input placeholder="-" />
          </Form.Item>
        </Flex>
      </Form>

      <Form form={form} layout="vertical" className="info-input-area">
        <Flex gap={4}>
          <Form.Item label="대응기간(Day)" name={`responsePeriod-${index}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="공정 Step/Recipe" name={`processStep-${index}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="Flow Sequence" name={`flowSequence-${index}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="사용압력" name={`usePressure-${index}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="고객사 Spec" name={`customerSpec-${index}`}>
            <Input placeholder="-" />
          </Form.Item>

          <Form.Item label="제조 Spec" name={`manufactureSpec-${index}`}>
            <Input placeholder="-" />
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
}

export default CsAsDetailForm;