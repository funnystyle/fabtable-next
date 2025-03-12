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

const { Title } = Typography;

export const CsAsWorkForm = () => {

  return (
      <Form layout="vertical" className="info-input-area">
        <Flex gap={4}>
          <Form.Item label="조치내용 (상세)" name="actionText1">
            <Input.TextArea
              style={{
                height: "90px",
              }}
            />
          </Form.Item>

          <Form.Item label="조치결과" name="actionText2">
            <Input.TextArea
              style={{
                height: "90px",
              }}
            />
          </Form.Item>
        </Flex>
      </Form>
  );
}