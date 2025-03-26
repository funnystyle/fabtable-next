import {Button, Flex, Form, Input, Typography} from "antd";
import {DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";

const { Title } = Typography;

export const CsAsTitle = ({ form, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet }) => {

  const handleDelete = () => {
    const newKeys = keys.filter((_, idx) => !asCheckedKeySet.has(idx));
    setKeys(newKeys);

    setAsCheckedKeySet(new Set());
  }

  const handleAdd = () => {
    setKeys([...keys, keys.length]);
  }

  return (
      <Flex align="center" justify="space-between" className="info-title-area">
        <Flex align="center" gap={8}>
          <Title level={3} className="title-bullet">출장업무 내용</Title>

          <Flex align="center" gap={4} className="tit-side-area">
            <Form form={form}>
              <Form.Item label="조치 담당자(정)" name="chargePerson" className="charge-input">
                <Input placeholder="-" style={{ width: "110px", }} />
              </Form.Item>
            </Form>

            <Button type="primary" icon={<PlusOutlined />} iconPosition={"end"}
                    onClick={() => handleAdd()}
            >출장업무 내용 추가</Button>

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