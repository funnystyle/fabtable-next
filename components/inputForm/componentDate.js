import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";

export const componentDate = (form, recordColumn, index = -1) => {
  const handleSetToday = (e, fieldName) => {
    e.preventDefault(); // 기본 동작 방지
    console.log("fieldName", fieldName);
    form.setFieldValue(fieldName, dayjs()); // 오늘 날짜로 설정
  };

  const name = `${recordColumn.name}${index >= 0 ? `-${index}` : ""}`;

  return (
    <Form.Item
      key={name}
      label={
        <Link href="/" onClick={(e) => handleSetToday(e, name)}>
          {recordColumn.displayName}
        </Link>
      }
      name={name}
    >
      <DatePicker style={{ width: '100%' }} placeholder="날짜 선택" />
    </Form.Item>
  );
}