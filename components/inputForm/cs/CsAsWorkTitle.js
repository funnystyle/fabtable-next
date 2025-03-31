import { Button, Checkbox, DatePicker, Flex, Form, Input, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { csAsWorkInputs } from "@components/inputForm/cs/data/csAsWorkInputs";

const { Title } = Typography;

export const CsAsWorkTitle = ({ form, index, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet, handleReset }) => {

  const handleDelete = (index) => {
    // 현재 index를 삭제 하고, index보다 큰 index들을 1씩 줄여줌
    csAsWorkInputs.forEach((field) => {
      for (let i = index + 1; i <= keys.length; i++) {
        form.setFieldValue(`${field}-${i - 1}`, form.getFieldValue(`${field}-${i}`));
      }
    });



    const newKeys = keys.filter((_, idx) => idx !== index);
    setKeys(newKeys);

    setAsCheckedKeySet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(index);
      return new Set([...newSet].map((key) => key > index ? key - 1 : key));
    });

  }

  const handleCheckboxChange = (e, currentIndex) => {
    setAsCheckedKeySet((prevSet) => {
      const newSet = new Set(prevSet); // 기존 Set을 복사하여 새로운 Set 생성
      if (e.target.checked) {
        newSet.add(currentIndex);
      } else {
        newSet.delete(currentIndex);
      }
      return newSet; // 새로운 Set 객체로 업데이트해야 React가 상태 변경을 감지함
    });
  };

  const handleSetToday = (e, fieldName) => {
    e.preventDefault(); // 기본 동작 방지
    console.log("fieldName", fieldName);
    form.setFieldValue(fieldName, dayjs()); // 오늘 날짜로 설정
  };

  return (
    <Flex align="center" justify="space-between" className="title-area">
      <Flex align="center" gap={12}>
        <Title level={5} style={{ marginBottom: "0", }}>출장업무 내용 {index}</Title>

        <Checkbox
          checked={asCheckedKeySet.has(index)}
          onChange={(e) => handleCheckboxChange(e, index)}
        />

        <Form form={form}>
          <Flex gap={4} className="tit-side-area">
            <Form.Item label="조치 담당자(부)" name={`responsiblePerson-${index}`} className="charge-input">
              <Input placeholder="-" style={{ width: "110px", }} />
            </Form.Item>

            <Form.Item
              label={
                <Link href={"/"} onClick={(e) => handleSetToday(e, `responseDate-${index}`)}>
                  대응일
                </Link>
              }
              name={`responseDate-${index}`}>
              <DatePicker placeholder="날짜 선택" style={{ width: "160px", height: "32px", }} />
            </Form.Item>

            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(index)}>삭제</Button>
          </Flex>
        </Form>
      </Flex>

      <Button type="text" className="btn-all-reset"
              onClick={() => handleReset()}
      >초기화</Button>
    </Flex>
  );
}