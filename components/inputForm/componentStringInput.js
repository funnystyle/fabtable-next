import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";

export const componentStringInput = (recordColumn) => {
  return (
    <Form.Item key={recordColumn.id} label={`${recordColumn.displayName}`} name={`${recordColumn.name}`}>
      <Input placeholder={`${recordColumn.displayName || '값을 입력하세요'}`} />
    </Form.Item>
  );

}