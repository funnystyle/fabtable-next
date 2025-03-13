import {Button, Flex, Image, Upload} from "antd";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";

export const CsAsWorkFileInputBox = ({fileList, setFileList}) => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const fileInputRef = useRef(null); // 숨겨진 파일 입력 필드 참조

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleImageFileChange = ({ file, fileList: newFileList }) => {
    if (file.status !== "removed") {
      setFileList([
        ...fileList,
        ...newFileList.filter(
          (f) => !fileList.some((item) => item.uid === f.uid)
        ),
      ]);
    } else {
      setFileList(newFileList); // 삭제된 경우 리스트 갱신
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleManualUpload = (event) => {
    const files = event.target.files;

    if (files.length <= 0) return;

    for (let i = 0; i < files.length; i++) {
      const newFile = {
        uid: `${Date.now()}-${i+1}`, // 고유 ID 생성
        name: files[i].name,
        type: files[i].type, // ✅ 파일 MIME 타입 추가
        status: "done",
        url: URL.createObjectURL(files[i]), // 로컬 미리보기 URL 생성
      };

      setFileList(prevFileList => [...prevFileList, newFile]);
    }

    event.target.value = ""; // ✅ 파일 선택창 초기화
  };

  const uploadProps = {
    onChange: handleFileChange,
    multiple: true,
    fileList: fileList,
    showUploadList: true, // ✅ 업로드된 파일 리스트 유지
    beforeUpload: () => false, // ✅ 자동 업로드 방지 (직접 추가)
  };

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
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList.filter(file => file.type?.startsWith("image/"))}
        onPreview={handlePreview}
        onChange={handleImageFileChange}
        showUploadList={{ showRemoveIcon: true }} // 삭제 아이콘만 표시
        beforeUpload={() => false} // 파일을 바로 업로드하지 않고 리스트에 추가만
      >
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) =>
              !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

      <Upload {...uploadProps} />
      {/* 숨겨진 파일 입력 필드 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleManualUpload} // 파일이 선택되면 리스트에 추가
      />
    </div>
  );
}