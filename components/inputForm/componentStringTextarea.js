import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

export const componentStringTextarea = (recordColumn, index = -1) => {
  const name = handleComponentInputName(recordColumn, index);
  return (
    <Form.Item
      label={recordColumn.displayName}
      name={name}
      key={name}
    >
      <Input.TextArea
        style={{
          height: "90px",
        }}
      />
    </Form.Item>
  );

}