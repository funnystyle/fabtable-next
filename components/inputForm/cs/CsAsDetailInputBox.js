import React from "react";
import { CsAsDetailTitle } from "@components/inputForm/cs/CsAsDetailTitle";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsAsDetailForm from "@components/inputForm/cs/CsAsDetailForm";

const CsAsDetailInputBox = ({ form, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon }) => {

  const { recordKeys:keys } = useCsCreateConstantStore();

  return (
    <div id="cs4" className="info-wrap">
      <CsAsDetailTitle isCommon={isCommon} setIsCommon={setIsCommon} />

      {isCommon ? (
        <CsAsDetailForm form={form} checkedKeySet={checkedKeySet} setCheckedKeySet={setCheckedKeySet} isCommon={isCommon} setIsCommon={setIsCommon} index={0} />
      ) : keys.map((key, index) =>
        <CsAsDetailForm key={`cs-as-detail-${index}`} form={form} checkedKeySet={checkedKeySet} setCheckedKeySet={setCheckedKeySet} isCommon={isCommon} setIsCommon={setIsCommon} index={index} />
      )}
    </div>
  );
}

export default CsAsDetailInputBox;