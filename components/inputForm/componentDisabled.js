import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";

export const componentDisabled = (recordColumn) => {
  return (
    <Form.Item key={recordColumn.id} label={`${recordColumn.displayName}`} name={`${recordColumn.name}`}>
      <Input placeholder={`${'자동입력됩니다.'}`} disabled />
    </Form.Item>
  );

}