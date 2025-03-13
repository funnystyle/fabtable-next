import React, {useState} from "react";
import {CsAsWorkFileInputBox} from "@components/inputForm/cs/CsAsWorkFileInputBox";
import {CsAsWorkForm} from "@components/inputForm/cs/CsAsWorkForm";
import {CsAsWorkTitle} from "@components/inputForm/cs/CsAsWorkTitle";

export const CsAsWorkInputBox = ({form, index, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet}) => {

  const [fileList, setFileList] = useState([]);

  const handleReset = () => {
    setFileList([]);
    form.resetFields([
      `csUsername-${index+1}`,
      `responseDate-${index+1}`,
      `actionText1-${index+1}`,
      `actionText2-${index+1}`
    ]);
  }

  return (
    <React.Fragment key={`cs-as-work-${index}`}>
      {/*<div style={{ marginTop: "1.75rem" }} />*/}
      <div className="info-input-box">
        <CsAsWorkTitle form={form} index={index} keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} handleReset={handleReset} />

        <CsAsWorkForm form={form} index={index} />

        <CsAsWorkFileInputBox index={index} fileList={fileList} setFileList={setFileList} />
      </div>
    </React.Fragment>
  );
}