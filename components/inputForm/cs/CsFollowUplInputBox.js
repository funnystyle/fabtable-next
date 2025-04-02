import React, {useEffect, useState} from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import {CsFollowUpForm} from "@components/inputForm/cs/CsFollowUpForm";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import useCsDataStore from "@store/useCsDataStore";

const CsFollowUplInputBox = ({ form }) => {

  const { recordKeys:keys, isFollowUpCommon:isCommon, setIsFollowUpCommon:setIsCommon } = useCsCreateConstantStore();

  const [resetFlag, setResetFlag] = useState(false);

  const {isCopy} = useCsDataStore();

  useEffect(() => {
    if (isCopy) {
      setIsCommon(true);
      setResetFlag(prev => !prev);
    }
  }, [isCopy]);

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