import { DatePicker, Form, Input, InputNumber, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

export const componentNumberInput = (recordColumn, index = -1) => {
  const name = handleComponentInputName(recordColumn, index);
  return (
    <Form.Item key={name} label={`${recordColumn.displayName}`} name={name}>
      <InputNumber
        min={1}
        max={10}
        // onChange={onChange}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );

}