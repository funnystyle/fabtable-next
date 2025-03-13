import React from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import {handleCsAsDetailForm} from "@components/inputForm/cs/handleCsAsDetailForm";

export const handleCsAsDetailInputBox = (form, keys, setKeys, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon) => {

  return (
    <div id="cs4" className="info-wrap">
      <CsAsDetailTitle isCommon={isCommon} setIsCommon={setIsCommon} />

      {isCommon ? (handleCsAsDetailForm(form, keys, setKeys, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon, 0))
        : keys.map((key, index) => handleCsAsDetailForm(form, keys, setKeys, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon, index))}
    </div>
  );
}