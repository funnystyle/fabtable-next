import React, {useState} from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import {CsFollowUpForm} from "@components/inputForm/cs/CsFollowUpForm";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const CsFollowUplInputBox = ({ form }) => {

  const { recordKeys:keys, isFollowUpCommon:isCommon, setIsFollowUpCommon:setIsCommon } = useCsCreateConstantStore();

  const [resetFlag, setResetFlag] = useState(false);


  return (
    <div>
      <div id="cs-anchor-cs5" className="info-wrap">
        <CsAsDetailTitle title={"후속 조치"} isCommon={isCommon} setIsCommon={setIsCommon} setResetFlag={setResetFlag}/>

        {isCommon ?
          <CsFollowUpForm form={form} index={0} resetFlag={resetFlag} />
          : keys.map((key, index) =>
            <CsFollowUpForm key={`cs-follow-up-${index}`} form={form} index={index+1} resetFlag={resetFlag} />
          )}
        
        <div className="info-wrap-last" />
      </div>
    </div>
  );
}

export default CsFollowUplInputBox;