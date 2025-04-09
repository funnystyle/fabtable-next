import { Form, Input } from "antd";
import React from "react";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";
import useRecordDataStore from "@store/useRecordDataStore";

const ComponentDisabled = ({ recordColumn, index = -1 }) => {

  const name = handleComponentInputName(recordColumn, index);
  const { isNew } = useRecordDataStore();

  // const onChange = (e) => {
  //   if (isNew) return;
  //   if (name !== "serialNumber") return;
  //   const value = e.target.value;
  //   if (value.length < 11) return;
  //   const prefix = value.slice(0, 3);
  //   const prevPrefix = serialNumber.slice(0, 3);
  //   if (prefix !== prevPrefix) return;
  //   const lastFix = value.slice(7);
  //   const prevLastFix = serialNumber.slice(7);
  //   if (lastFix !== prevLastFix) return;
  //   setSerialNumber(value);
  // }


  return (
    <Form.Item key={name} label={`${recordColumn.displayName}`} name={name}>
      <Input placeholder={`${'자동입력됩니다.'}`} disabled={(name!=='serialNumber' || isNew)} />
    </Form.Item>
  );

}

export default ComponentDisabled;