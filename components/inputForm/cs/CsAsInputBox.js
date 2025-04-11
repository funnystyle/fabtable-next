import React, { useEffect, useState } from "react";
import {CsAsTopInputBox} from "@components/inputForm/cs/CsAsTopInputBox";
import {CsAsTitle} from "@components/inputForm/cs/CsAsTitle";
import {CsAsWorkInputBox} from "@components/inputForm/cs/CsAsWorkInputBox";
import useCsDataStore from "@store/useCsDataStore";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const CsAsInputBox = ({ form, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet }) => {

  const [resetFlag, setResetFlag] = useState(false);

  const { csDetail  } = useCsDataStore();
  const { files, setFiles } = useCsCreateConstantStore();

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
    if (csDetail?.csAsWorkContents && csDetail.csAsWorkContents.length > 0) {
      const filesList = csDetail.csAsWorkContents.map((workContent, index) => {
        const files = workContent.csAsWorkContentFiles;
        if (!files || !Array.isArray(files)) return [];

        return files.map((file, index) => ({
          uid: `${Date.now()}-${index + 1}`,
          name: file.originFilename,
          type: getFileMimeType(file.originFilename), // 선택적으로 MIME 타입 추정
          status: "done",
          url: file.fullUrl, // ✅ 서버에서 내려준 실제 다운로드/미리보기 URL
        }));
      });

      const newFiles = filesList.reduce((acc, fileList, index) => {
        acc[(index+1) + ""] = fileList;
        console.log(acc);
        return acc;
      }, {});
      setFiles(newFiles);
    }
  }, [csDetail]);
  
  return (
    <div>
      <div id="cs-anchor-cs3" className="info-wrap">
        <CsAsTitle form={form} keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} setResetFlag={setResetFlag}/>

        <CsAsTopInputBox form={form} />

        {(keys || []).map((key, index) => (
          <CsAsWorkInputBox
            key = {`cs-as-work-${index}`}
            form={form}
            index={index+1}
            keys={keys}
            setKeys={setKeys}
            asCheckedKeySet={asCheckedKeySet}
            setAsCheckedKeySet={setAsCheckedKeySet}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
            files={files[index+1] || []}
          />
        ))}
      </div>
    </div>
  );
}

export default CsAsInputBox;