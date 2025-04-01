import React, {useState} from "react";
import {CsAsTopInputBox} from "@components/inputForm/cs/CsAsTopInputBox";
import {CsAsTitle} from "@components/inputForm/cs/CsAsTitle";
import {CsAsWorkInputBox} from "@components/inputForm/cs/CsAsWorkInputBox";

const CsAsInputBox = ({ form, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet }) => {

  const [resetFlag, setResetFlag] = useState(false);
  
  return (
    <div>
      <div id="cs-anchor-cs3" className="info-wrap">
        <CsAsTitle form={form} keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} setResetFlag={setResetFlag}/>

        <CsAsTopInputBox form={form} />

        {(keys || []).map((key, index) => (
          <CsAsWorkInputBox
            key = {`cs-as-work-${index}`}
            form={form}
            index={index+1}
            keys={keys}
            setKeys={setKeys}
            asCheckedKeySet={asCheckedKeySet}
            setAsCheckedKeySet={setAsCheckedKeySet}
            resetFlag={resetFlag}
          />
        ))}
      </div>
    </div>
  );
}

export default CsAsInputBox;