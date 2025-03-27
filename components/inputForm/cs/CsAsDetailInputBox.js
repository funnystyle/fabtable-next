import React from "react";
import {CsAsDetailTitle} from "@components/inputForm/cs/CsAsDetailTitle";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsAsDetailForm from "@components/inputForm/cs/CsAsDetailForm";

const CsAsDetailInputBox = ({ form }) => {

  const { recordKeys:keys, isAsDetailCommon:isCommon, setIsAsDetailCommon:setIsCommon} = useCsCreateConstantStore();

  return (
    <div>
      <div id="cs-anchror-cs4" className="info-wrap">
        <CsAsDetailTitle title={"출장 내역"} isCommon={isCommon} setIsCommon={setIsCommon} />

        {isCommon ? (
          <CsAsDetailForm form={form} index={0} />
        ) : keys.map((key, index) =>
          <CsAsDetailForm key={`cs-as-detail-${index}`} form={form} index={index+1} />
        )}
      </div>
    </div>
  );
}

export default CsAsDetailInputBox;