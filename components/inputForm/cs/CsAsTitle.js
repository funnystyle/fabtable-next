import { Button, Flex, Form, Input, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import useCsDataStore from "@store/useCsDataStore";
import { csAsWorkInputs } from "@components/inputForm/cs/data/csAsWorkInputs";

const { Title } = Typography;

export const CsAsTitle = ({ form, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet, setResetFlag }) => {

  const handleDelete = () => {

    const keptValues = {}; // 삭제되지 않은 값들을 모아둘 객체

    // 1. 삭제 대상이 아닌 값들만 추출
    keys.forEach((_, idx) => {
      if (!asCheckedKeySet.has(idx + 1)) {
        csAsWorkInputs.forEach((field) => {
          const key = `${field}-${idx + 1}`;
          keptValues[field] = keptValues[field] || [];
          keptValues[field].push(form.getFieldValue(key));
        });
      }
    });

    // 2. form 값들을 위에서부터 다시 세팅
    csAsWorkInputs.forEach((field) => {
      keptValues[field].forEach((val, idx) => {
        form.setFieldValue(`${field}-${idx + 1}`, val);
      });
    });

    const newRecordKeys = keys.filter((_, idx) => !asCheckedKeySet.has(idx + 1));
    setKeys(newRecordKeys);

    setAsCheckedKeySet(new Set());
  }


  const handleAdd = () => {
    setKeys([...keys, keys.length]);
  }

  const handleReset = () => {
    setKeys([0]);
    setAsCheckedKeySet(new Set());
    let nameList = ["chargePerson", "receiptContent", "visitContent"];
    form.resetFields(nameList);

    setResetFlag(prev => !prev);
  }

  const { allResetFlag } = useCsDataStore();
  useEffect(() => {
    handleReset();
  }, [allResetFlag]);

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
          <Button icon={<RedoOutlined />} size="small" className="ico-rotate" onClick={() => handleReset()} />

          {/*<Button icon={<SettingOutlined />} size="small" />*/}
        </Flex>
      </Flex>
  );
}