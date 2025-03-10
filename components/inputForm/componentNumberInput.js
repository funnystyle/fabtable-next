import { DatePicker, Form, Input, InputNumber, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";

export const componentNumberInput = (recordColumn) => {
  return (
    <Form.Item key={recordColumn.id} label={`${recordColumn.displayName}`} name={`${recordColumn.name}`}>
      <InputNumber
        min={1}
        max={10}
        // onChange={onChange}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );

}