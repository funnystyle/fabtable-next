import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

export const componentReadOnly = (recordColumn, index = -1) => {
  const name = handleComponentInputName(recordColumn, index);
  return (
    <Form.Item key={name} label={`${recordColumn.displayName}`} name={name}>
      <Input placeholder={`${'자동입력됩니다.'}`} readOnly />
    </Form.Item>
  );
}