import { Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

const ComponentReadOnly = ({ form, recordColumn, index = -1 }) => {
  const name = handleComponentInputName(recordColumn, index);

  return (
    <Form.Item key={name} label={`${recordColumn.displayName}`} name={name}>
      <Input placeholder={`${'자동입력됩니다.'}`} readOnly/>
    </Form.Item>
  );
}

export default ComponentReadOnly;