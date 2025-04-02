import React, {useState} from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsAsDetailForm from "@components/inputForm/cs/CsAsDetailForm";
import useCsDataStore from "@store/useCsDataStore";

const CsAsDetailInputBox = ({ form }) => {

  const { recordKeys:keys, isAsDetailCommon:isCommon, setIsAsDetailCommon:setIsCommon} = useCsCreateConstantStore();

  const [resetFlag, setResetFlag] = useState(false);

  return (
    <div>
      <div id="cs-anchor-cs4" className="info-wrap">
        <CsAsDetailTitle title={"출장 내역"} isCommon={isCommon} setIsCommon={setIsCommon} setResetFlag={setResetFlag}/>

        {isCommon ? (
          <CsAsDetailForm form={form} index={0} resetFlag={resetFlag} />
        ) : keys.map((key, index) =>
          <CsAsDetailForm key={`cs-as-detail-${index}`} form={form} index={index+1} resetFlag={resetFlag} />
        )}
      </div>
    </div>
  );
}

export default CsAsDetailInputBox;