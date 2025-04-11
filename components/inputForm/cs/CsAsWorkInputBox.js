import React, {useEffect, useState} from "react";
import {CsAsWorkFileInputBox} from "@components/inputForm/cs/CsAsWorkFileInputBox";
import {CsAsWorkForm} from "@components/inputForm/cs/CsAsWorkForm";
import {CsAsWorkTitle} from "@components/inputForm/cs/CsAsWorkTitle";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import useCsDataStore from "@store/useCsDataStore";

export const CsAsWorkInputBox = ({form, index, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet, resetFlag, setResetFlag}) => {

  const { files, setFiles } = useCsCreateConstantStore();

  const handleReset = () => {
    setFileList([], index)
    form.resetFields([
      `responseDate-${index}`,
      `responsiblePerson-${index}`,
      `responseContent-${index}`,
      `responseResult-${index}`,
    ]);
  }
  const { setIsChange } = useCsDataStore();

  const setFileList = (fileList, index) => {
    let newFiles = {...files};
    newFiles[index+""] = fileList;
    setFiles(newFiles);

    setIsChange(true);
  }


  useEffect(() => {
    if (resetFlag) {
      handleReset();
      setResetFlag(false);
    }
  }, [resetFlag]);

  return (
    <React.Fragment key={`cs-as-work-${index}`}>
      {/*<div style={{ marginTop: "1.75rem" }} />*/}
      <div className="info-input-box">
        <CsAsWorkTitle form={form} index={index} keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} handleReset={handleReset} />

        <CsAsWorkForm form={form} index={index} />

        <CsAsWorkFileInputBox index={index} fileList={files[index+""] || []} setFileList={setFileList} />
      </div>
      <div style={{marginBottom: "16px"}}/>
    </React.Fragment>
  );
}