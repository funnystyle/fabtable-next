import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

export const componentDisabled = (recordColumn, index = -1) => {
  const name = handleComponentInputName(recordColumn, index);
  return (
    <Form.Item key={name} label={`${recordColumn.displayName}`} name={name}>
      <Input placeholder={`${'자동입력됩니다.'}`} disabled />
    </Form.Item>
  );

}