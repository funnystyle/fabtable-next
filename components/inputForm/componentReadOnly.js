import { Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

const ComponentReadOnly = ({ form, recordColumn, index = -1 }) => {
  const name = handleComponentInputName(recordColumn, index);

  const values = Form.useWatch([], form); // 폼 전체 값을 watch
  useEffect(() => {
    if (recordColumn.name === "convertedFlowrate") {
      const flowrate = form.getFieldValue("flowrate") || 0;
      const conversionFactor = form.getFieldValue("conversionFactor") || 1;
      const convertedFlowrate = parseFloat((flowrate / conversionFactor).toFixed(2));
      form.setFieldsValue({ convertedFlowrate });
    }
  }, [values]);
    // form에서 flowrate, conversionFactor의 값을 가져와서 계산
    // flowrate / conversionFactor

  return (
    <Form.Item key={name} label={`${recordColumn.displayName}`} name={name}>
      <Input placeholder={`${'자동입력됩니다.'}`} readOnly/>
    </Form.Item>
  );
}

export default ComponentReadOnly;