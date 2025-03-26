import React from "react";
import {CsAsTopInputBox} from "@components/inputForm/cs/CsAsTopInputBox";
import {CsAsTitle} from "@components/inputForm/cs/CsAsTitle";
import {CsAsWorkInputBox} from "@components/inputForm/cs/CsAsWorkInputBox";

export const handleCsAsInputBox = (form, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet) => {

  return (
    <div id="cs3" className="info-wrap">
      <CsAsTitle form={form} keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} />

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
        />
      ))}
    </div>
  );
}