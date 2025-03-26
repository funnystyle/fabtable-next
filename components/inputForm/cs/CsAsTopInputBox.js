import { Button, Checkbox, DatePicker, Flex, Form, Image, Input, Typography, Upload } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";
import { CsRecordInputComponentRow } from "@components/inputForm/cs/CsRecordInputComponentRow";
import Link from "next/link";

const { Title } = Typography;

export const CsAsTopInputBox = ({ form }) => {

  return (
    <div className="info-input-box">
      <Title level={4} className="title-bullet">
        현상 내용
      </Title>

      <Form form={form} layout="vertical" className="info-input-area">
        <Flex gap={4}>
          <Form.Item
            label="접수 시 현상 및 내용(상세)"
            name="receiptContent"
          >
            <Input.TextArea
              style={{
                height: "90px",
              }}
            />
          </Form.Item>

          <Form.Item
            label="현장 방문 후 확인 현상"
            name="visitContent"
          >
            <Input.TextArea
              style={{
                height: "90px",
              }}
            />
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
}