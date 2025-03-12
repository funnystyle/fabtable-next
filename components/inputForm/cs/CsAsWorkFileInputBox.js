import { Button, Checkbox, DatePicker, Flex, Form, Image, Input, Typography, Upload } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { handleInputComponentRow } from "@components/inputForm/handleInputComponentRow";
import { handleCsRecordInputComponentRow } from "@components/inputForm/cs/handleCsRecordInputComponentRow";
import Link from "next/link";
import { CsAsTopInputBox } from "@components/inputForm/cs/CsAsTopInputBox";
import { CsAsTitle } from "@components/inputForm/cs/CsAsTitle";

const { Title } = Typography;

export const CsAsWorkFileInputBox = () => {

  const fileInputRef = useRef(null); // 숨겨진 파일 입력 필드 참조

  return (
    <div className="file-upload-area">
      <Flex
        align="center"
        gap={12}
        style={{
          marginBottom: "16px",
        }}
      >
        <p className="title-file-upload">파일 및 사진 첨부</p>

        <Button
          icon={<UploadOutlined />}
          type="primary"
          iconPosition={"end"}
          onClick={() => fileInputRef.current?.click()} // ✅ 파일 선택창 열기
        >
          파일 업로드
        </Button>
      </Flex>

      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        // fileList={fileList}
        // onPreview={handlePreview}
        // onChange={handleFileChange}
        showUploadList={{ showRemoveIcon: true }} // 삭제 아이콘만 표시
        beforeUpload={() => false} // 파일을 바로 업로드하지 않고 리스트에 추가만
      >
        {/*{fileList.length >= 8 ? null : uploadButton}*/}
      </Upload>

      {/*{previewImage && (*/}
      {/*  <Image*/}
      {/*    wrapperStyle={{ display: "none" }}*/}
      {/*    preview={{*/}
      {/*      visible: previewOpen,*/}
      {/*      onVisibleChange: (visible) => setPreviewOpen(visible),*/}
      {/*      afterOpenChange: (visible) =>*/}
      {/*        !visible && setPreviewImage(""),*/}
      {/*    }}*/}
      {/*    src={previewImage}*/}
      {/*  />*/}
      {/*)}*/}

      {/*<Upload {...uploadProps} />*/}
      {/* 숨겨진 파일 입력 필드 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        // onChange={handleManualUpload} // 파일이 선택되면 리스트에 추가
      />
    </div>
  );
}