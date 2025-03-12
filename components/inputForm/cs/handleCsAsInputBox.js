import { Button, Checkbox, DatePicker, Flex, Form, Image, Input, Typography, Upload } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";
import { handleCsRecordInputComponentRow } from "@components/inputForm/cs/handleCsRecordInputComponentRow";
import Link from "next/link";
import { CsAsTopInputBox } from "@components/inputForm/cs/CsAsTopInputBox";
import { CsAsTitle } from "@components/inputForm/cs/CsAsTitle";
import { handleCsAsWorkInputBox } from "@components/inputForm/cs/handleCsAsWorkInputBox";

const { Title } = Typography;

export const handleCsAsInputBox = (keys, setKeys, asCheckedKeySet, setAsCheckedKeySet) => {

  return (
    <div id="cs3" className="info-wrap">
      <CsAsTitle keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} />

      <CsAsTopInputBox />

      {keys.map((key, index) => (handleCsAsWorkInputBox(index, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet)))}
    </div>
  );
}