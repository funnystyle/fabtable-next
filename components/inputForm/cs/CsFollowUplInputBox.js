import React from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import {CsFollowUpForm} from "@components/inputForm/cs/CsFollowUpForm";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const CsFollowUplInputBox = ({ form, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon }) => {

  const { recordKeys:keys } = useCsCreateConstantStore();

  return (
    <div id="cs4" className="info-wrap">
      <CsAsDetailTitle isCommon={isCommon} setIsCommon={setIsCommon} />

      {isCommon ?
        <CsFollowUpForm form={form} checkedKeySet={checkedKeySet} setCheckedKeySet={setCheckedKeySet} isCommon={isCommon} setIsCommon={setIsCommon} index={0} />
        : keys.map((key, index) =>
          <CsFollowUpForm
            key={`cs-follow-up-${index}`}
            form={form} checkedKeySet={checkedKeySet} setCheckedKeySet={setCheckedKeySet} isCommon={isCommon} setIsCommon={setIsCommon} index={index} />)}
    </div>
  );
}

export default CsFollowUplInputBox;