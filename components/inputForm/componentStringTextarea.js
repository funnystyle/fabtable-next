import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";

export const componentStringTextarea = (recordColumn) => {
  return (
    <Form.Item
      label={recordColumn.displayName}
      name={recordColumn.name}
      key={recordColumn.id}
    >
      <Input.TextArea
        style={{
          height: "90px",
        }}
      />
    </Form.Item>
  );

}