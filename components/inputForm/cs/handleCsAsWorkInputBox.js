import { Button, Checkbox, DatePicker, Flex, Form, Image, Input, Typography, Upload } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";
import { handleCsRecordInputComponentRow } from "@components/inputForm/cs/handleCsRecordInputComponentRow";
import Link from "next/link";
import { CsAsTopInputBox } from "@components/inputForm/cs/CsAsTopInputBox";
import { CsAsTitle } from "@components/inputForm/cs/CsAsTitle";
import { CsAsWorkFileInputBox } from "@components/inputForm/cs/CsAsWorkFileInputBox";
import { CsAsWorkForm } from "@components/inputForm/cs/CsAsWorkForm";
import { CsAsWorkTitle } from "@components/inputForm/cs/CsAsWorkTitle";

const { Title } = Typography;

export const handleCsAsWorkInputBox = (index, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet) => {

  return (
    <div className="info-input-box" key={`cs-as-work-${index}`}>
      <CsAsWorkTitle index={index} keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} />

      <CsAsWorkForm />

      <CsAsWorkFileInputBox />
    </div>
  );
}