import React, {useEffect, useState} from "react";
import {CsAsWorkFileInputBox} from "@components/inputForm/cs/CsAsWorkFileInputBox";
import {CsAsWorkForm} from "@components/inputForm/cs/CsAsWorkForm";
import {CsAsWorkTitle} from "@components/inputForm/cs/CsAsWorkTitle";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import useCsDataStore from "@store/useCsDataStore";

export const CsAsWorkInputBox = ({form, index, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet, resetFlag}) => {

  const { files:formFiles, setFiles:setFormFiles } = useCsCreateConstantStore();

  const [fileList, setFileList] = useState([]);

  const handleReset = () => {
    setFileList([]);
    form.resetFields([
      `responseDate-${index}`,
      `responsiblePerson-${index}`,
      `responseContent-${index}`,
      `responseResult-${index}`,
    ]);
  }

  useEffect(() => {
    let newFiles = {...formFiles};
    newFiles[index+""] = fileList;
    setFormFiles(newFiles);
  }, [fileList]);

  const { csDetail } = useCsDataStore();

  const handleLoadFilesFromServer = (fileDtos) => {
    if (!fileDtos || !Array.isArray(fileDtos)) return;

    const loadedFiles = fileDtos.map((file, index) => ({
      uid: `${Date.now()}-${index + 1}`,
      name: file.originFilename,
      type: getFileMimeType(file.originFilename), // 선택적으로 MIME 타입 추정
      status: "done",
      url: file.fullUrl, // ✅ 서버에서 내려준 실제 다운로드/미리보기 URL
    }));

    setFileList(loadedFiles);
  };

  const getFileMimeType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'pdf':
        return 'application/pdf';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default:
        return 'application/octet-stream'; // 일반 파일
    }
  };

  useEffect(() => {
    if (
      csDetail?.csAsWorkContents &&                // 배열이 존재하고
      Array.isArray(csDetail.csAsWorkContents) &&  // 배열 타입이며
      csDetail.csAsWorkContents.length >= index    // 인덱스 범위 안에 있다면
    ) {
      const workContent = csDetail.csAsWorkContents[index - 1];
      console.log("Selected WorkContent: ", workContent.csAsWorkContentFiles);

      handleLoadFilesFromServer(workContent.csAsWorkContentFiles);
    }
  }, [csDetail]);

  useEffect(() => {
    handleReset();
  }, [resetFlag]);

  return (
    <React.Fragment key={`cs-as-work-${index}`}>
      {/*<div style={{ marginTop: "1.75rem" }} />*/}
      <div className="info-input-box">
        <CsAsWorkTitle form={form} index={index} keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} handleReset={handleReset} />

        <CsAsWorkForm form={form} index={index} />

        <CsAsWorkFileInputBox index={index} fileList={fileList} setFileList={setFileList} />
      </div>
      <div style={{marginBottom: "16px"}}/>
    </React.Fragment>
  );
}