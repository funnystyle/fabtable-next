import React from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import {CsFollowUpForm} from "@components/inputForm/cs/CsFollowUpForm";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const CsFollowUplInputBox = ({ form }) => {

  const { recordKeys:keys, isFollowUpCommon:isCommon, setIsFollowUpCommon:setIsCommon } = useCsCreateConstantStore();

  return (
    <div id="cs4" className="info-wrap">
      <CsAsDetailTitle title={"후속 조치"} isCommon={isCommon} setIsCommon={setIsCommon} />

      {isCommon ?
        <CsFollowUpForm form={form} index={0} />
        : keys.map((key, index) =>
          <CsFollowUpForm key={`cs-follow-up-${index}`} form={form} index={index+1} />
        )}
    </div>
  );
}

export default CsFollowUplInputBox;