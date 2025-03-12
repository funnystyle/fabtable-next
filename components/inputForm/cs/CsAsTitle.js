import { Button, Checkbox, DatePicker, Flex, Form, Image, Input, Typography, Upload } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";
import { handleCsRecordInputComponentRow } from "@components/inputForm/cs/handleCsRecordInputComponentRow";
import Link from "next/link";
import { CsAsTopInputBox } from "@components/inputForm/cs/CsAsTopInputBox";

const { Title } = Typography;

export const CsAsTitle = ({ keys, setKeys, asCheckedKeySet, setAsCheckedKeySet }) => {

  const handleDelete = () => {
    const newKeys = keys.filter((_, idx) => !asCheckedKeySet.has(idx));
    setKeys(newKeys);
  }

  return (
      <Flex align="center" justify="space-between" className="info-title-area">
        <Flex align="center" gap={8}>
          <Title level={3} className="title-bullet">출장업무 내용</Title>

          <Flex align="center" gap={4} className="tit-side-area">
            <Form.Item label="조치 담당자(정)" name="username" className="charge-input">
              <Input placeholder="-" style={{ width: "110px", }} />
            </Form.Item>

            <Button type="primary" icon={<PlusOutlined />} iconPosition={"end"}>출장업무 내용 추가</Button>

            <Button icon={<DeleteOutlined />} iconPosition={"end"} onClick={() => handleDelete()}>삭제</Button>
          </Flex>
        </Flex>

        <Flex gap={10}>
          <Button icon={<RedoOutlined />} size="small" className="ico-rotate" />

          <Button icon={<SettingOutlined />} size="small" />
        </Flex>
      </Flex>
  );
}