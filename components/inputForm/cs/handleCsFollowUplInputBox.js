import React from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import {handleCsFollowUpForm} from "@components/inputForm/cs/handleCsFollowUpForm";

export const handleCsFollowUplInputBox = (form, keys, setKeys, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon) => {

  return (
    <div id="cs4" className="info-wrap">
      <CsAsDetailTitle isCommon={isCommon} setIsCommon={setIsCommon} />

      {isCommon ? (handleCsFollowUpForm(form, keys, setKeys, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon, 0))
        : keys.map((key, index) => handleCsFollowUpForm(form, keys, setKeys, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon, index))}
    </div>
  );
}