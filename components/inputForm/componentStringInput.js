import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

export const componentStringInput = (recordColumn, index = -1) => {
  const name = handleComponentInputName(recordColumn, index);
  return (
    <Form.Item key={name} label={`${recordColumn.displayName}`} name={name}>
      <Input placeholder={`${recordColumn.displayName || '값을 입력하세요'}`} />
    </Form.Item>
  );

}